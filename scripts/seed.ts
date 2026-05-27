import { config } from "dotenv";
import { createClient } from "next-sanity";

config({ path: ".env" });
config({ path: ".env.local", override: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_READ_TOKEN in .env (needs editor scope)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// ---------- Block helpers ----------

type Span = { _key: string; _type: "span"; marks: string[]; text: string };
type Block = {
  _key: string;
  _type: "block";
  style: "normal" | "h2" | "h3" | "blockquote";
  markDefs: never[];
  children: Span[];
};

function blocks(text: string): Block[] {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((para, i): Block => {
      const trimmed = para.trim();
      if (trimmed.startsWith("## ")) return mk(i, "h2", trimmed.slice(3));
      if (trimmed.startsWith("### ")) return mk(i, "h3", trimmed.slice(4));
      if (trimmed.startsWith("> ")) return mk(i, "blockquote", trimmed.slice(2));
      return mk(i, "normal", trimmed);
    });
}

function mk(i: number, style: Block["style"], text: string): Block {
  return {
    _key: `b${i}`,
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: `s${i}`, _type: "span", marks: [], text }],
  };
}

// ---------- Authors ----------

const AUTHORS = [
  {
    _id: "author-editorial",
    name: "The Editors",
    initials: "ED",
    bio: "The KYG editorial desk. Long features, position pieces, and any article that needs to stand for the journal itself.",
  },
  {
    _id: "author-ananya-r",
    name: "Ananya R.",
    initials: "AR",
    bio: "Writes about nutrition, metabolism, and how to eat for the biology you actually have. Based in Bangalore.",
  },
  {
    _id: "author-vikram-k",
    name: "Dr. Vikram K.",
    initials: "VK",
    bio: "Geneticist and clinician. Translates polygenic risk scores into plain language and useful decisions for everyday readers.",
  },
  {
    _id: "author-priya-s",
    name: "Priya S.",
    initials: "PS",
    bio: "Fitness, performance, and the genetics that shape how you train. Strength coach and science writer.",
  },
  {
    _id: "author-riya-m",
    name: "Dr. Riya M.",
    initials: "RM",
    bio: "Preventive medicine physician focused on the thirty-to-fifty window of leverage. Practices in Mumbai.",
  },
  {
    _id: "author-sneha-k",
    name: "Sneha K.",
    initials: "SK",
    bio: "Sleep, circadian biology, and the everyday cost of fighting your chronotype. Trained at the Centre for Sleep Research.",
  },
  {
    _id: "author-aruna-g",
    name: "Dr. Aruna G.",
    initials: "AG",
    bio: "Gerontology and longevity research, with a particular interest in Indian cohorts and healthspan after fifty.",
  },
  {
    _id: "author-neha-b",
    name: "Neha B.",
    initials: "NB",
    bio: "Food writer and nutrition researcher. Cooks every recipe she writes about. Currently working on a book about Indian kitchen science.",
  },
  {
    _id: "author-manas-k",
    name: "Dr. Manas K.",
    initials: "MK",
    bio: "Molecular biologist. Writes about epigenetics, lifestyle, and the gap between genetic code and lived outcome.",
  },
  {
    _id: "author-tanya-r",
    name: "Tanya R.",
    initials: "TR",
    bio: "Behavioural science and the biology of stress. Mostly trying to convince readers to sleep more and check their cortisol less.",
  },
] as const;

// ---------- Post bodies ----------

const BODY_FLAGSHIP = `
There is a moment, somewhere in your late twenties or early thirties, when the wellness advice you have been ignoring all your life suddenly seems to apply to you. The doctor mentions cholesterol. A cousin gets diagnosed with diabetes. Your mother starts asking when you last had a blood test. You go to the internet, the internet sends you to a wellness influencer in California, and the wellness influencer tells you to try intermittent fasting, switch to oat milk, take a vitamin D3 supplement of 1,000 IU, and walk ten thousand steps a day.

Most of that advice was developed for a person who does not look like you, does not eat like you, and does not metabolise food the way your body does. Some of it will work. Some of it will not. A small fraction of it might actively hurt. The strange thing is, nobody is lying. The research the influencer is drawing on is real research. It just was not done on Indians.

## Three things the global handbook gets wrong about Indian bodies

Take the simplest example. The 2025 South Asian genome study published on bioRxiv pulled genetic data from roughly eight thousand individuals across India, Pakistan, and Bangladesh and looked at one of the most studied genes in human biology, LCT, the lactase gene. In most Northern European populations, somewhere between fifty and ninety percent of adults carry a variant that lets them digest milk into adulthood. In most South Asian populations, the figure is closer to twelve percent. The default state across the subcontinent is lactase non-persistence. We stopped making the enzyme around the time we were weaned, and never started again.

And yet India produces more dairy than any other country on earth. Doodh and dahi and paneer are not optional features of the Indian plate, they are foundational. The biology and the culture are out of phase. Most of us have been quietly negotiating with the consequences our whole lives. The bloating after the second chai. The discomfort after the heavy paneer dinner. The vague sense that something is off. Most Indians do not have lactose intolerance as a diagnosed condition. Most Indians have lactose intolerance as the unexamined background hum of their digestion.

The standard Western advice ("cut dairy if it bothers you, otherwise it is fine") is built for a population where lactase persistence is the rule. For us, the rule is the opposite, and the advice needs to be reversed. Smaller portions. Fermented forms first (dahi and chaas before milk). The right kind of paneer, in the right quantity, at the right time of day. Or, if the data says so, a clean switch.

## Vitamin D, calibrated to the wrong baseline

Move to vitamin D. The studies in urban Asian Indian cohorts are not subtle. Mean serum 25(OH)D levels in one well-cited Indian study sat at around 9.8 nanograms per millilitre, which is squarely in the deficient range, and ninety-four percent of the subjects met clinical deficiency criteria. This is not a small effect in a small sample. This is a feature of how South Asian skin, melanin, and modern indoor life interact with the latitude of the subcontinent. Darker skin synthesises vitamin D more slowly. Air-conditioned office life cuts sun exposure further. The dietary sources of vitamin D in a typical Indian vegetarian diet are limited. The deficiency is not unusual. It is the median state.

The standard global supplementation advice (1,000 IU per day, sometimes 2,000) was calibrated against populations that are not starting from this baseline. For an Indian adult with deficient or insufficient status, that dose can be too low to move the needle for months. And the response itself is genetic. Variants in the VDR gene, particularly the FokI and BsmI polymorphisms, change how efficiently your cells respond to whatever vitamin D is in your blood. Two people taking the same supplement, eating the same dinner, and getting the same sun exposure can end up with very different downstream effects on bone density, immune function, and cardiovascular markers.

This is not a reason to take more. It is a reason to test, dose, retest, and personalise, which is exactly the protocol almost no general physician in India actually runs.

## A decade-younger heart attack

The third example is the one we should have been talking about for thirty years. Cardiovascular disease in South Asians arrives roughly a decade earlier than it does in Western populations. Multiple large studies (npj Cardiovascular Health published a 2025 systematic review, the BRAVE study out of Bangladesh, the ScienceDirect review on South Asian ASCVD) have converged on the same finding. Indians have their first myocardial infarction about ten years younger than Caucasians on average. The risk profile is also strange: thinner, lower BMI, often non-smoking patients are showing up in cardiac wards in their forties. The standard Framingham risk calculator, which was built on the Framingham, Massachusetts cohort beginning in 1948, systematically underestimates risk for us.

Some of this is lifestyle and some of it is genetic. FTO variants are associated with type 2 diabetes risk in South Asians in ways that do not always show up in European cohorts. Lipoprotein(a) levels, a less famous cardiovascular risk marker that conventional cholesterol panels do not measure, run higher in South Asian populations. The dyslipidaemia pattern is its own dialect: lower HDL, higher triglycerides, more abdominal fat at lower body weights. None of this means South Asians are doomed. It means the playbook has to be different.

## So what to actually do

The first move is the easiest one. Stop applying advice that was not built for you. The keto diet was tested largely on European and American populations. Intermittent fasting protocols have their best evidence in similar cohorts. The "eat more leafy greens" gospel, taken seriously, runs into iron absorption interactions specific to a vegetarian Indian diet. None of these are wrong. But none of them are guaranteed to work for the person reading this article, because the studies they came from were not run on the person reading this article.

The second move is to find out where your own biology actually is. The standard battery for an Indian adult who wants to take preventive care seriously runs something like this: an HbA1c and fasting insulin (not just fasting glucose), a full lipid panel including ApoB and Lp(a) if you can get them, a 25(OH)D level, a B12 level, a basic thyroid panel, and, increasingly, a wellness-focused DNA panel that covers the variants relevant to South Asian biology: LCT for lactose, MTHFR for folate metabolism, CYP1A2 for caffeine, FTO and TCF7L2 for metabolic risk, VDR for vitamin D response, and the cardiovascular set.

None of these tests by itself tells you what to do. Together, they tell you which of the global wellness recommendations actually apply to you, and which you can safely ignore. That is the only honest version of personalised wellness. Not a coloured chart that promises optimisation, but a set of facts about your own metabolism that lets you stop guessing.

## If you want to start somewhere

If you have never had a DNA wellness panel done, that is the highest-leverage single test you can run in your thirties. It is a one-time blood or saliva sample. The report is reusable for the rest of your life. Your genes do not change. The price has dropped dramatically over the last five years. The interpretation has gotten markedly better. And for South Asian readers specifically, the new wave of Indian-population-trained tests have begun to close the gap between what the technology can do and what it can do for you.

We have spent a few months looking at the options available in India and the wellness DNA panel we currently recommend covers diet response, fitness type, weight management, nutrition absorption, cardio-metabolic risk, and skin and sleep markers. It runs on a saliva sample collected at home and the report is delivered in two weeks, with an included counsellor session to walk you through what the numbers actually mean for your daily decisions. We have no commercial stake in which brand of test you pick. But if you would like to look at the one we use ourselves, the link below opens directly to the order page.

> RECOMMENDED · DNA WELLNESS PANEL. Saliva collection at home. 14-day turnaround. Covers diet, fitness, weight, nutrition, cardio-metabolic, skin, and sleep markers, calibrated against South Asian reference data. Includes a 30-minute counsellor session to interpret the report. From ₹X,XXX. Order the wellness panel.

If you would rather not test yet, do this instead. Get the 25(OH)D level checked at your next blood draw, get a lipid panel that includes ApoB if your lab offers it, and start treating dairy with the suspicion your biology probably already justifies. Those three moves alone will tell you more about your wellness baseline than three months of generic supplements ever will.

The genetic luck that decides where you start is not under your control. What you do once you know where you are starting, that almost entirely is.

## Sources cited or referenced in this article

Revisiting the Evolution of Lactase Persistence: Insights from South Asian Genomes, bioRxiv, November 2025.

Prevalence and functional significance of 25-hydroxyvitamin D deficiency and vitamin D receptor gene polymorphisms in Asian Indians, American Journal of Clinical Nutrition.

Drivers of Atherosclerotic Cardiovascular Disease in South Asians, Current Insights and Future Directions, JACC: Asia, 2026.

Addressing myocardial infarction in South-Asian populations, npj Cardiovascular Health, 2025.

FTO gene variants are strongly associated with type 2 diabetes in South Asian Indians, Diabetologia.

Disentangling Dual Threats: Premature Coronary Artery Disease and Early-Onset T2DM in South Asians, Journal of the Endocrine Society, 2023.
`;

const BODY_CARD_01 = `
You did everything the magazine told you. Switched to brown rice. Swapped ghee for olive oil. Added a morning smoothie. Dropped the second chai. Started counting macros on a phone app. Three months in, the weight has not moved. Your fasting glucose is the same. Your energy is, if anything, slightly lower. You feel quietly betrayed.

Here is the part the magazine left out. The "healthy" diet you read about, the one with the testimonials and the before-and-after photos, was tested on a population that does not eat your food, does not metabolise it the way you do, and in many cases does not share your genetic risk profile.

## What personalised nutrition actually means

Personalised nutrition is a bigger field than the supplement industry suggests. At its serious end, it is a research area that studies how individual genetic variants interact with specific nutrients to produce different metabolic outcomes. At its sillier end, it is a quiz that recommends a different shade of green smoothie.

A small number of gene variants do most of the heavy lifting in the serious version. TCF7L2 and FTO sit close to type 2 diabetes risk. PPARG and APOE influence how your body handles dietary fat. MTHFR shapes folate metabolism. CYP1A2 decides whether the espresso you just ordered will help you focus or wreck your sleep. None of these variants are deterministic. Each of them tilts a probability. Stacked together, they explain a meaningful slice of why two friends on the same meal plan get very different results.

## What the research shows about Indian biology

The Indian metabolic phenotype is its own thing. Lower BMI thresholds for cardiometabolic risk. Higher abdominal fat at given body weights. A genetic tilt towards insulin resistance that shows up in cohorts well before symptoms do. The PURE study, the ICMR-INDIAB series, and the more recent South Asian genome work have all pointed at the same conclusion. A typical urban Indian adult is metabolically older than their chronological age suggests, and the dietary advice imported from European trials is calibrated for someone who is not.

The practical implication is unflattering and useful in equal measure. If your "healthy" diet centres on grains, processed dairy, and snacking, your insulin curve probably does not look like the curve in the textbook. The fix is not a fad. It is a smaller plate of refined carbohydrate, more protein than you are probably eating, fibre with every meal, and a willingness to test instead of assume.

## Three changes you can run this week

The first one is the cheapest. Start every meal with vegetables. Order matters. Beginning with fibre changes the glycaemic shape of what comes next. It is the dumbest, most reliable intervention in the modern nutrition literature, and Indian thalis make it easy to do without thinking.

The second is protein. Add a fist of it to every meal. Dal counts. Eggs count. Paneer counts in modest amounts. Most Indian plates underdeliver on protein. The deficit shows up as poor satiety, then as overeating, then as a metabolic story that does not fit your gym schedule.

The third is the second chai. Replace it with water. Caffeine and sugar in the late afternoon can be the difference between a flat insulin curve and a spiky one, and the difference between a deep sleep and a restless one. Watch how you wake up over the next two weeks.

## When you are ready to test

Three numbers are worth more than any wellness quiz. Fasting insulin, not just glucose. HbA1c, not just lipid. And, if you can find a lab that runs it, a DNA wellness panel that covers the metabolic variants for a South Asian reference. The genes do not change. The report you get at thirty is the report you have at fifty. It is one of the few pieces of biology you only need to buy once.

The promise of personalised nutrition is not that the right diet will be exciting. It is that the right diet will be obvious, once you stop guessing. That is the version worth pursuing.
`;

const BODY_CARD_02 = `
Most genetic testing language is built to keep you out of the conversation. SNP, polygenic score, variant of uncertain significance, allele frequency, hazard ratio. The words land in your inbox in a PDF report that runs sixty pages, and the report opens by telling you to consult your physician. The physician, who has not been trained on this kind of report, tells you to follow up with a specialist. The specialist asks if you have come for clinical or for wellness reasons. By the time you finish the loop, the report is in a folder you have stopped opening.

This piece is the version that should have been on the cover page of that PDF.

## What a genetic test is actually looking at

Your genome has about three billion base pairs. The vast majority are identical between any two humans on the planet. The places where individuals differ are called variants, and the most common kind is a single-nucleotide polymorphism, or SNP, where one letter in the code is swapped for another. Some SNPs do nothing. Some change a protein. A small fraction change something you can feel.

A typical wellness DNA test does not read all three billion letters. It reads a panel, a few hundred or a few thousand specific SNPs that have been linked, in published research, to traits relevant to health: how you metabolise caffeine, how your body handles fat, whether you produce lactase as an adult, how efficiently your VDR receptor binds vitamin D. The panel is a focused snapshot, not the full book.

## What a polygenic score is, and is not

For some conditions, no single variant tells you very much, but a sum of many small effects does. That sum is a polygenic risk score. A polygenic score for type 2 diabetes adds up dozens of small contributions and produces a number that, on average, sorts a population from lower to higher risk.

The number is a population statistic, not a prophecy. If your score puts you in the top decile for type 2 diabetes risk, your lifetime probability is higher than someone in the bottom decile, but it is still not one. Lifestyle, age, weight, sleep, and exposure decide where you actually land. The score sets the slope. You walk the slope.

## What a "variant of uncertain significance" means

When a report flags a variant as VUS, it is being honest. The variant exists in your code, the research has not yet decided whether it matters, and the lab will not pretend otherwise. Most VUS findings are eventually reclassified as benign as more data accumulates. A small fraction become clinically relevant. The right response to a VUS, in almost every case, is to file it and not redecorate your life around it.

## What a wellness panel can actually tell you

The honest list is short. It can tell you whether you make lactase as an adult. It can tell you whether you metabolise caffeine quickly or slowly. It can tell you whether your VDR variant means you need more vitamin D than the standard dose, or less. It can tell you whether your APOE variant tilts you towards saturated-fat sensitivity. It can tell you whether your PPARG variant rewards a higher-fat or higher-carb day. It can sketch your fitness response profile (endurance lean or power lean) using ACTN3, ACE, and PPARGC1A. It can flag a cardiovascular risk panel that your annual lipid test misses.

It cannot tell you what you will die of. It cannot tell you whether to take a job. It cannot make a person fit. It cannot replace a blood test for the diseases you actually have right now.

## How to read a report without spiralling

Treat the report like a weather forecast for the next thirty years. Note the variants that argue for a behaviour change you can make this month. Note the variants that argue for a test you should ask for at your next physical. Ignore the rest. Re-read it once a year. Your genes will not change. The science around them will, and the report will get more useful as it does.

## The honest version of "personalised"

The point of getting tested is not to feel special. It is to stop guessing. A DNA wellness panel, run once, gives you a small, durable set of facts about your own biology that lets you ignore most of the advice that does not apply to you. That is a quietly powerful thing. It is also, currently, the most underrated tool in preventive care for South Asian adults.
`;

const BODY_CARD_03 = `
Two friends start the same beginner strength programme on the same day. Same compound lifts, same set and rep scheme, same diet plan downloaded from the same coach. Six weeks later, one of them has visibly more muscle and a measurable increase in their five-rep maxes. The other has the same physique they walked in with.

Both of them did the programme. One of them got the programme. The difference between those two outcomes is not motivation. About half of it is genetics, and the genetics in question are well studied enough that we know which ones.

## ACTN3, the sprint gene

ACTN3 codes for a protein found almost exclusively in fast-twitch muscle fibres, the ones responsible for explosive power. Roughly eighteen percent of the global population carries two copies of the R577X variant, which switches off ACTN3 production. The result, in athletic cohorts, is striking. Sprint athletes are heavily overrepresented in the functional-ACTN3 group. Endurance athletes are overrepresented in the non-functional group. The same gene tilts the same body towards different sports.

For a lifter, the implication is modest but real. People with functional ACTN3 tend to recover faster from heavy, explosive work and tend to add visible muscle in shorter timelines. People without it often need more total volume to drive the same hypertrophy, but they tolerate sustained sub-maximal work better and recover faster from it.

## ACE, the endurance angle

The ACE gene has two common variants, I and D. The I allele is associated with endurance performance. The D allele is associated with strength and power. Like ACTN3, ACE is not a one-gene story, but it shows up consistently in athletic genotype studies, and the effect compounds with ACTN3.

If you carry the endurance-leaning combination, you will probably enjoy longer training blocks, higher rep ranges, and steady-state work more than the average gym-goer. You will also adapt more visibly to those modalities. If you carry the power-leaning combination, your gains will arrive faster from low-rep, high-load work, and your body will protest at any attempt to spend all month doing twelve-rep tempo squats.

## PPARGC1A, the mitochondrial dial

PPARGC1A controls mitochondrial biogenesis, the slow process by which your cells build more energy factories in response to training. People with certain PPARGC1A variants build mitochondria more readily, which translates to faster aerobic adaptation, better metabolic flexibility, and a measurable advantage in any sport that lasts longer than a few minutes.

This is the gene that explains why some people start a couch-to-5K and three months later are running half marathons, while others log the same kilometres and feel exactly as tired as they did on day one.

## So what do you do with this

You do not need to get tested to start training well. You do need to drop the assumption that your friend's programme will work on your body. The first month of any new training block is data. If your strength is climbing faster than your size, lean into it and build a programme around progressive overload. If your size is climbing faster than your strength, accept that volume is your friend and stop chasing one-rep maxes. If neither is climbing, change the variable (frequency first, then volume, then load) and try again.

A wellness DNA test that includes ACTN3, ACE, and PPARGC1A will give you a written version of what your body will eventually tell you anyway, just six months sooner. For most people, that head start is the difference between sticking with the gym for a year and quitting in week eight.

## The unsexy summary

Genetics decides about half of your response. The other half is sleep, protein, programming, and consistency, in roughly that order. The half you cannot change is fixed. The half you can is everything. Train the body you have.
`;

const BODY_CARD_04 = `
The decade between thirty-five and forty-five is when most lifestyle conditions begin their slow accumulation, and most of them begin without symptoms. Blood pressure creeps up by two or three points a year. Fasting insulin climbs into the high teens before your fasting glucose ever moves. Lp(a) sits in your blood at a level set largely at birth and quietly accelerates plaque formation, while your annual cholesterol report keeps coming back "normal". The annual physical you do at thirty-eight catches almost none of this.

The good news is that the catch-up is not hard. The list of things you need to actually do in this decade is shorter than the wellness industry would like you to believe. Most of it costs nothing. Some of it costs a one-time test fee. None of it requires a supplement subscription.

## The four numbers that matter most

Fasting insulin. Not fasting glucose. Glucose is a late indicator. Insulin rises for years before glucose does, and a fasting insulin over ten signals that your pancreas is already working harder than it should to keep your sugar normal. If your insulin is in the high teens or twenties, you are insulin resistant. The fix is the same in every guideline ever written: fewer refined carbohydrates, more protein, more fibre, more movement, better sleep.

HbA1c. The three-month average of your blood sugar. Below 5.4 is great. 5.4 to 5.6 is normal but worth watching. 5.7 to 6.4 is pre-diabetic, which most Indians get at younger ages and lower BMIs than the guidelines assume. 6.5 and above is diabetic.

ApoB or Lp(a). If your lab can run them, they tell you more about your cardiovascular risk than total cholesterol or LDL ever could. ApoB counts every atherogenic particle in your blood. Lp(a) is mostly genetic, mostly stable across life, and if it is elevated you need to know now, because it adds independent risk that your usual lipid panel will not show.

Resting heart rate and blood pressure, measured at home, in a calm state, three times a week. Two of the most diagnostic numbers in cardiology, and almost nobody measures them at home.

## The two tests every Indian in this decade should run once

A 25(OH)D level. Vitamin D deficiency is the median state in urban Indian adults. Most physicians do not test it. Most patients are walking around at half the level they should be. Replenishment is cheap and the difference in mood, bone density, and immune function is well documented.

A wellness DNA panel that covers Indian-relevant variants. LCT (lactose), MTHFR (folate), CYP1A2 (caffeine), FTO and TCF7L2 (metabolic), VDR (vitamin D response), APOE and Lp(a) (cardiovascular). The panel runs once, the result is yours for life, and it tells you which of the global health recommendations are actually relevant to your body and which you can stop worrying about.

## The four habits worth the effort

Sleep regularity. Same wake-up time, six days a week. The body's circadian system runs on consistency more than duration, and a steady wake time is the single biggest lever in the literature for metabolic health.

Strength training. Twice a week. Compound lifts, progressively heavier over months. Skeletal muscle is the largest endocrine organ in the body. The amount you have at fifty largely determines your insulin sensitivity, bone density, and quality of life in your sixties.

A daily walk. Twenty to thirty minutes. After a meal if you can. The post-prandial walk is one of the most studied and least exciting interventions in metabolic medicine, and it works on almost everyone.

Annual bloodwork. The same panel each year, run at the same lab, so you can see your trend line. A single reading is noise. A trend over five years is signal.

## What to safely ignore

Most supplements. The vast majority do nothing for a person who is not deficient in the underlying nutrient. The exceptions, for many Indian adults, are vitamin D and B12.

The ten-thousand-step rule. It is an arbitrary number invented by a Japanese pedometer marketing team in the 1960s. Movement is good. Step count is a proxy. The proxy is fine. The number is meaningless.

Most "detox" protocols. Your liver and kidneys handle detoxification quite well without a cleanse, a juice, or a tea. If your liver function is abnormal, see a hepatologist, not a wellness influencer.

Most apps that tell you a single number is your "health score". Health is too multifactorial for one number, and the score is almost always optimised for engagement, not for outcome.

## The long arc

The decade between thirty-five and forty-five is not when illness happens. It is when illness is decided. The version of you that turns sixty in good health is built almost entirely in these ten years. The version that turns sixty in a clinic is built in the same ten years, just by inattention. The work is not glamorous. It is the same four habits, the same six tests, repeated annually, paid attention to. That is most of preventive care. Most of it is that simple.
`;

const BODY_CARD_05 = `
You feel guilty for needing nine hours. Your friend functions on six and laughs at you for it. The internet keeps telling you that real productivity is up at five, that successful people sleep less, that you can train your way to a smaller sleep need. None of this is true. Your chronotype is largely written in your genes, and the cost of fighting it is paid in the currencies you care about most: mood, memory, metabolism, and skin.

## What the research actually shows

PER3 is one of the best-studied clock genes in humans. A short variant in PER3 is associated with reduced slow-wave sleep efficiency, which is to say, people with the short variant tend to need more hours in bed to extract the same restoration. CRY1 carries a variant linked to delayed sleep phase, the genetic version of "I just am not sleepy until two AM, no matter when I lie down". BMAL1 and CLOCK round out the supporting cast.

None of these variants is destiny. Together they explain a meaningful slice of why two people on the same schedule wake up in such different states.

## Total sleep need is a distribution

Adult sleep need follows a normal distribution centred somewhere between seven and eight hours, with a long tail in both directions. About one to three percent of the population are genuine short sleepers, with mutations (DEC2 is the famous one) that let them function on five to six hours indefinitely. They are rare. If you know somebody who claims to be one, they almost certainly are not.

At the other end of the curve sit people who genuinely need nine. They are not lazy. They are sampled from a normal distribution that nobody asked them to opt into.

## What to do if you are a long sleeper

Stop apologising for it. Build the schedule around the requirement, not around the moral judgement attached to it. Sleep is when memory is consolidated, growth hormone is released, glucose tolerance is reset, and emotional regulation is restored. The brain you have at noon is the brain your sleep built last night.

The practical changes are small and durable. Get out of bed at the same time every day, weekends included. Pull caffeine to before noon. Stop screens half an hour before bed. Keep the room dark and a few degrees cooler than feels natural. None of these are new. All of them are more powerful than supplements.

## What to do if you are a short sleeper, genuinely

If you wake up consistently rested on six hours, eat normally, and have stable mood and weight, you may genuinely be in the short tail. The way to find out is to track for a month. Wearable data on heart rate variability and resting heart rate will tell you whether your body agrees with you. If your HRV is climbing on six hours, you are fine. If it is sinking, you are not actually a short sleeper, you are an exhausted one.

## What chronotype testing can add

A wellness DNA panel that includes PER3, CRY1, and the rest of the clock genes will give you a written version of what your body already knows. It is useful because it short-circuits the negotiation with yourself. Knowing that your delayed sleep phase is genetically tilted makes it easier to stop punishing yourself for not being a morning person, and easier to design a schedule that works.

The most reliable wellness intervention in modern medicine is sleep that fits the biology. Everything else, including diet and exercise, works better when this one is right. Start here.
`;

const BODY_CARD_06 = `
The longevity literature for Indian adults is uneven. Most of the headline studies were run on Northern European cohorts that look nothing like a fifty-five-year-old in Hyderabad or a sixty-five-year-old in Trichy. The advice that follows is reasonably well supported in Indian and South Asian samples, and it ignores the supplement aisle entirely.

## The protein gap

The single biggest dietary correction for an Indian adult over fifty is protein. Most plates underdeliver, and the deficit gets worse with age because appetite drops, dentition changes, and habit patterns harden. The consequence is sarcopenia, the silent loss of skeletal muscle, which starts in the forties and accelerates in the sixties.

Skeletal muscle is the largest endocrine organ in the body. The amount you have at sixty largely decides your insulin sensitivity, bone density, fall risk, and quality of life into your seventies and eighties. The fix is unglamorous. Aim for one gram of protein per kilogram of body weight, every day, distributed across meals. Dal counts. Eggs count. Curd counts. Paneer in moderate amounts counts. A protein scoop in a glass of milk counts.

## The grip strength signal

Grip strength is one of the best low-cost predictors of all-cause mortality after fifty, across multiple cohorts including South Asian ones. It is a proxy for total skeletal muscle and for nervous system health. A grip strength dynamometer costs less than a thousand rupees. Test once a quarter. Track the trend.

The intervention, if your grip strength is declining, is the same intervention recommended for almost everything else in this article. Lift heavy things twice a week, eat enough protein, walk daily.

## The two tests every Indian over fifty should ask for

A complete vitamin D and B12 panel. Both deficiencies are common in Indian adults over fifty and both have measurable consequences for cognitive function, mood, and energy. Replenishment is cheap and reverses the symptoms in weeks, not months.

A bone density scan (DXA). Indian women in particular are at high risk for osteoporosis, often without any symptoms until a fracture. A baseline DXA in the early fifties, repeated every five years, tells you whether your skeleton is keeping up.

## What to ignore

The ten-thousand-step rule has thin evidence below the age of seventy. Movement matters, total volume matters, but the specific number was a marketing artefact, not a guideline. Walk because you enjoy it and because you sleep better.

Most "anti-aging" supplements have weak evidence in human trials. The exceptions, where deficiencies exist, are vitamin D, B12, omega-3 if your diet is low in fatty fish, and creatine for the small but consistent benefit it shows on cognition and muscle in older adults.

The myth that strength training is unsafe after fifty has the evidence base of a generation ago. The current literature is unambiguous. Progressive resistance training is one of the best-studied interventions for healthspan in older adults. Find a trainer who has worked with older clients. Start with bodyweight. Add load slowly. Keep going.

## The long arc

The version of you that turns seventy in good health is built in the years between fifty and sixty-five. The work is the same work you should have been doing at forty, with more attention to protein, more attention to strength, and more attention to the two tests above. Aging well in India is not a mystery. It is a small set of habits, run for long enough.
`;

const BODY_CARD_07 = `
A tablespoon of turmeric is having its third Western moment. The latte is in coffee shops in London, the powder is at Whole Foods, the curcumin capsules are on the supplement shelves. Indians have had it on the stove for three thousand years. Most of the wellness-industry claims are louder than the evidence supports. Some of them are very well supported. The interesting story is the gap between the two.

## Haldi

Curcumin is the bioactive in turmeric, and it is one of the most studied phytochemicals in clinical medicine. The honest summary is that it has measurable anti-inflammatory effects in many studies, weak or absent effects in others, and a bioavailability problem that limits everything. Curcumin is poorly absorbed on its own. Eaten with fat, or with piperine (the bioactive in black pepper), absorption rises significantly. Indian cooking has been doing both, by accident, for thousands of years. Haldi in ghee. Haldi in a tadka, with jeera. Haldi in dal with a final tempering of fried mustard, garlic, and chilli. The kitchen got there first.

The supplement-industry claims (curcumin for arthritis, depression, Alzheimer's, cancer prevention) range from modest evidence to wishful thinking. The kitchen claim (regular dietary turmeric as one of several anti-inflammatory inputs in a varied diet) is well supported.

## Methi

Fenugreek seeds, soaked overnight and chewed in the morning, are one of the better-studied home remedies for glycaemic control in South Asian populations. Multiple small trials in Indian and Pakistani cohorts show a measurable improvement in fasting glucose and post-prandial glycaemia, with effect sizes that are modest but real. The mechanism is partly the soluble fibre, which slows gastric emptying, and partly compounds that improve insulin sensitivity.

For an adult with pre-diabetes or insulin resistance, soaked methi is one of the cheapest interventions available. It does not replace medication. It complements diet and movement.

## Jeera and ajwain

Cumin's effects on gastric motility and digestion are well attested in traditional use and reasonably supported in small modern studies. Carum copticum (ajwain) has antimicrobial and digestive-stimulant properties in vitro and in small clinical samples. Both are safe at culinary doses and the everyday cooking dose is more than enough.

Neither is a treatment for any serious condition. Both belong in the kitchen.

## The thing the supplement industry leaves out

Spices, in food, in normal cooking quantities, are a low-dose continuous intervention. Spices, in capsule form, at megadoses, are something else. The capsule version sometimes works. It sometimes does not. It sometimes interacts with medications (curcumin with blood thinners, fenugreek with diabetes medications) in ways the label does not warn you about.

The kitchen dose is safe, evidence-supported, and free. The capsule dose is a clinical decision that should involve a physician who knows what else you are taking.

## What to actually do

Cook Indian food the way it is traditionally cooked. Bloom whole spices in fat at the start of a dish. Use turmeric in your dal and your sabzis. Soak methi for tea or salads. Use ajwain in parathas and as a digestive after heavy meals. Drink chaas or lassi with lunch rather than between meals.

None of this is exotic. None of it requires a supplement subscription. All of it is supported by enough research to justify the habit. The masala dabba is not a pharmacy, but it is closer to one than the wellness industry's repackaged version of it.
`;

const BODY_CARD_08 = `
For most of the twentieth century, the working metaphor for the genome was a blueprint. You inherited a fixed set of instructions, the instructions were copied into every cell, and the cells executed them. Disease risk was largely written in at conception, and the most you could do was hope that the instructions you had drawn were the favourable ones.

The metaphor was wrong, or rather, it was incomplete. The genome turns out to be more like an instrument than a blueprint. The notes are written, but the volume on each note is set, and reset, by environment. The science that studies this is called epigenetics, and it has quietly become the most consequential field in preventive medicine over the last twenty years.

## What epigenetics actually does

DNA methylation, the addition of a small chemical group (a methyl) to specific cytosine bases, can switch genes off or dial their expression up and down without changing the underlying code. Histone modification, the chemical decoration of the proteins that DNA wraps around, controls how accessible a gene is to the machinery that reads it. Non-coding RNAs further regulate which genes get expressed and how strongly.

The result is that two people with identical DNA can have very different gene expression patterns, and therefore very different phenotypes. The trivial proof is identical twins. The deeper proof is what happens to identical twins as they age. Their methylation patterns drift apart, and by the time they are seventy, their epigenetic states are quite different. The drift is not random. It reflects everything they have eaten, smoked, slept through, exercised through, and stressed about in the intervening decades.

## What this means for the inheritance you were dealt

If you have a strong family history of type 2 diabetes, your TCF7L2 and FTO variants are tilted in a particular direction. That tilt is fixed. What is not fixed is how those genes are expressed in your liver, your muscle, your pancreas, your fat. Expression is influenced by sleep, diet composition, physical activity, body fat distribution, and circadian regularity. Lifestyle is not a counter-spell against bad genes. It is the volume knob on the genes you have.

The clearest evidence comes from monozygotic twin pairs discordant for diabetes. Same DNA. Different epigenetic states. Different diseases. The exposures that move the methylation needle most consistently are diet (particularly methyl-donor intake from folate, B12, and choline), sleep, exercise, and stress regulation.

## Inheritance across generations

Some epigenetic marks can be inherited. The Dutch Hunger Winter studies showed that children born to mothers who experienced severe famine during pregnancy carried methylation changes at specific metabolic genes decades later, with measurable consequences for their adult health. The Överkalix studies in Sweden showed that grandparental food supply correlated with cardiovascular and diabetes mortality in grandchildren. The mechanism in humans is debated. The signal is real.

For South Asian readers, this matters more than it does for most populations. The thrifty phenotype hypothesis (that bodies which evolved or developed under famine conditions become metabolically maladapted to modern caloric abundance) is well supported in Indian cohorts. Some of the metabolic risk we carry was set in utero or in the first two years of life by conditions our parents and grandparents lived through.

This is not a counsel of despair. It is the opposite. The genome's plasticity runs in both directions. What was set down can be modified by what is done now. The same lifestyle that buffers the inherited risk in this generation is the lifestyle that begins to reset the marks for the next.

## What to actually do

The interventions that move epigenetic markers most consistently are unglamorous. Adequate folate intake, especially in women considering pregnancy (leafy greens, lentils, fortified flour, occasionally a supplement if the MTHFR variant warrants it). Adequate B12. Regular movement, especially the kind that builds insulin sensitivity. Sleep regularity. Body fat in a healthy range. Avoidance of tobacco and limitation of alcohol. None of these are surprises. All of them have direct, measurable effects on gene expression.

The fancy interventions (NAD precursors, sirtuin activators, rapamycin) have weaker evidence and larger price tags. They may eventually earn a place in the protocol. They have not yet.

## The honest summary

The genes are a starting point, not a sentence. The expressed phenotype, the version of you that actually walks around in the world, is the result of the genes plus everything you have done to them. The leverage runs in both directions, and the leverage is real. The decade between thirty and fifty is the highest-yield window to use it. Do not waste it waiting for a supplement to do the work.
`;

const BODY_CARD_09 = `
The same workload breaks one person and energises another. The difference is not character. About half of it is the speed at which your nervous system clears stress hormones, and that speed is largely set by two genes.

COMT codes for the enzyme that breaks down catecholamines, including dopamine and norepinephrine. The Val158Met polymorphism gives you one of three combinations. Val/Val clears catecholamines quickly. Met/Met clears them slowly. Val/Met sits in between. The fast clearers tend to handle acute stress better but feel flatter at baseline. The slow clearers run more cortisol-sensitive, perform better in low-stress focused work, and burn out more visibly under sustained pressure.

FKBP5 is a regulator of the glucocorticoid receptor, which is to say, it controls how sensitive your cells are to cortisol. Certain FKBP5 variants leave the receptor turned up for longer after a stressor, which means it takes longer for the system to return to baseline. People with the high-sensitivity variants take longer to recover from a hard week.

## What this means in practice

If you are the slow-recovery type, a Friday night with friends is not enough. Your nervous system is still elevated on Monday. The fix is not motivational. It is structural. Schedule deload weeks. Protect sleep more aggressively than your peers do. Keep caffeine to mornings only. Build a wind-down ritual that is non-negotiable. Pay particular attention to the post-work hour, because if your cortisol is still high at seven PM, it is going to be high at midnight.

If you are the fast-recovery type, you have a different problem. You under-rest because rest feels unnecessary. Over years, that catches up as cardiovascular wear, sleep fragmentation, and a baseline tiredness that you misread as productivity. The fix is the same fix, just applied with less enthusiasm.

## The intervention that works for both types

Sleep regularity. Same wake time, six days a week, no exceptions. The circadian system runs on consistency. Cortisol, the morning rise that pulls you awake and the evening fall that lets you sleep, runs on the same clock. The single most reliable intervention for stress recovery in the literature is steady sleep, and most people are giving themselves none of it.

The other one is movement, in the morning if possible. Daylight on the retina plus aerobic movement in the first hour after waking sets the cortisol curve correctly for the rest of the day. It is a small intervention with a large downstream effect.

## When to test

If you suspect you are the slow-recovery type, a wellness DNA panel that includes COMT and FKBP5 will tell you. It is one of the few cases where genetic information directly justifies a behavioural change you would not otherwise make. Knowing that your nervous system is running on a different clock than your colleagues' is sometimes the permission you need to design your week around it.
`;

// ---------- Posts ----------

const POSTS = [
  {
    _id: "post-flagship",
    title: "Why one-size-fits-all health advice was never built for Indian biology",
    slug: "one-size-fits-all-health-advice-indian-biology",
    excerpt:
      "South Asians develop heart disease nearly a decade earlier than Caucasians. We are the world's largest producer of dairy, and most of us cannot digest it past childhood. The vitamin D deficiency rates in urban Indian cohorts cross ninety percent. None of this is in the standard health pamphlet. This is why the standard health pamphlet keeps failing us.",
    category: "Genomic Science",
    readTime: 12,
    variant: 2,
    featured: true,
    authorRef: "author-editorial",
    daysAgo: 0,
    body: BODY_FLAGSHIP,
  },
  {
    _id: "post-healthy-diet-not-working",
    title: 'Why your "healthy" diet might not be working for you',
    slug: "your-healthy-diet-might-not-be-working",
    excerpt:
      "The same plate of dal, rice, and sabzi will spike one person's blood sugar and barely move another's. The reason sits in a handful of genes most of us have never heard of. Here is what the research actually says about personalised nutrition, and what to ignore.",
    category: "Nutrition",
    readTime: 6,
    variant: 1,
    featured: false,
    authorRef: "author-ananya-r",
    daysAgo: 3,
    body: BODY_CARD_01,
  },
  {
    _id: "post-genetic-testing-without-jargon",
    title: "The science of genetic testing, explained without the jargon",
    slug: "genetic-testing-explained-without-jargon",
    excerpt:
      "SNPs. Polygenic scores. Variants of uncertain significance. The language of genomics is built to keep most people out of the conversation. We translate. What a test can tell you, what it cannot, and how to read a report without spiralling.",
    category: "Genomic Science",
    readTime: 9,
    variant: 2,
    featured: false,
    authorRef: "author-vikram-k",
    daysAgo: 5,
    body: BODY_CARD_02,
  },
  {
    _id: "post-same-workout-different-response",
    title: "Why two people respond differently to the same workout",
    slug: "two-people-different-workout-response",
    excerpt:
      "One person gains muscle in six weeks of lifting. The other does the same programme and gets nothing. Genetics explains roughly half of that gap. Here is what the ACTN3, ACE, and PPARGC1A variants are actually doing inside the gym.",
    category: "Fitness",
    readTime: 7,
    variant: 3,
    featured: false,
    authorRef: "author-priya-s",
    daysAgo: 7,
    body: BODY_CARD_03,
  },
  {
    _id: "post-preventive-routine-30s-40s",
    title: "Building a preventive health routine in your 30s and 40s",
    slug: "preventive-health-routine-30s-and-40s",
    excerpt:
      "The decade between thirty-five and forty-five is when most lifestyle conditions begin their slow accumulation, often without symptoms. What to track, what to test, and what to safely ignore as you enter the high-leverage years.",
    category: "Preventive Care",
    readTime: 11,
    variant: 4,
    featured: false,
    authorRef: "author-riya-m",
    daysAgo: 8,
    body: BODY_CARD_04,
  },
  {
    _id: "post-genetics-of-sleep",
    title: "The genetics of sleep: why some of us need six hours and others nine",
    slug: "genetics-of-sleep-six-or-nine-hours",
    excerpt:
      "Your chronotype is not a personality quirk and it is not a moral failing. It is largely written in your PER3 and CRY1 genes. Here is how to work with the schedule your biology prefers, instead of against it.",
    category: "Lifestyle",
    readTime: 5,
    variant: 5,
    featured: false,
    authorRef: "author-sneha-k",
    daysAgo: 14,
    body: BODY_CARD_05,
  },
  {
    _id: "post-aging-well-india",
    title: "Aging well in India: what the latest research actually says",
    slug: "aging-well-india-latest-research",
    excerpt:
      "Beyond the supplement aisle and the ten-thousand-step myth, the evidence-backed habits that move the needle on healthspan after fifty. The protein gap. The grip strength signal. The two tests every Indian over fifty should ask for.",
    category: "Senior Wellness",
    readTime: 8,
    variant: 6,
    featured: false,
    authorRef: "author-aruna-g",
    daysAgo: 15,
    body: BODY_CARD_06,
  },
  {
    _id: "post-spice-as-medicine",
    title: "Spice as medicine: the science behind your masala dabba",
    slug: "spice-as-medicine-masala-dabba",
    excerpt:
      "Turmeric is having a moment in the West. Indians have had it on the stove for three thousand years. We look at what the research actually shows about haldi, methi, jeera, and ajwain, separating the documented benefits from the wellness-industry mythology.",
    category: "Nutrition",
    readTime: 6,
    variant: 7,
    featured: false,
    authorRef: "author-neha-b",
    daysAgo: 21,
    body: BODY_CARD_07,
  },
  {
    _id: "post-epigenetics-rewrites-rules",
    title: "Inherited but not inevitable: how epigenetics rewrites the rules",
    slug: "inherited-but-not-inevitable-epigenetics",
    excerpt:
      "The genes you were born with are not a sentence. They are an instruction set, and the instructions can be turned up or down by diet, sleep, stress, and movement. Here is what the new science of epigenetics is telling us about the gap between genetic risk and lived outcome.",
    category: "Genomic Science",
    readTime: 10,
    variant: 8,
    featured: false,
    authorRef: "author-manas-k",
    daysAgo: 22,
    body: BODY_CARD_08,
  },
  {
    _id: "post-stress-cortisol-genes",
    title: "Stress, cortisol, and the genes that decide your baseline",
    slug: "stress-cortisol-genes-baseline",
    excerpt:
      "Why the same workload breaks one person and energises another. Your COMT and FKBP5 variants set the speed at which your nervous system clears stress hormones. For some people, recovery from a hard week takes a weekend. For others, it takes a fortnight. Here is what to do if you are the second type.",
    category: "Lifestyle",
    readTime: 4,
    variant: 9,
    featured: false,
    authorRef: "author-tanya-r",
    daysAgo: 28,
    body: BODY_CARD_09,
  },
];

// ---------- Operations ----------

async function deleteExistingPostsAndAuthors() {
  // Order matters: posts reference authors, so delete posts first.
  const postIds = await client.fetch<string[]>(
    `*[_type == "post" && !(_id in path("drafts.**"))]._id`,
  );
  for (const id of postIds) {
    await client.delete(id);
  }
  if (postIds.length) console.log(`✓ deleted ${postIds.length} posts`);

  const authorIds = await client.fetch<string[]>(
    `*[_type == "author" && !(_id in path("drafts.**"))]._id`,
  );
  for (const id of authorIds) {
    await client.delete(id);
  }
  if (authorIds.length) console.log(`✓ deleted ${authorIds.length} authors`);

  if (!postIds.length && !authorIds.length) {
    console.log("(no existing posts or authors to delete)");
  }
}

async function seedAuthors() {
  for (const a of AUTHORS) {
    await client.createOrReplace({
      _id: a._id,
      _type: "author",
      name: a.name,
      initials: a.initials,
      bio: a.bio,
    });
  }
  console.log(`✓ ${AUTHORS.length} authors created`);
}

async function seedPosts() {
  for (const p of POSTS) {
    const publishedAt = new Date(Date.now() - p.daysAgo * 86_400_000).toISOString();
    await client.createOrReplace({
      _id: p._id,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.excerpt,
      category: p.category,
      author: { _type: "reference", _ref: p.authorRef },
      publishedAt,
      readTime: p.readTime,
      variant: p.variant,
      featured: p.featured,
      body: blocks(p.body),
    });
  }
  console.log(`✓ ${POSTS.length} posts created (1 featured + ${POSTS.length - 1} cards)`);
}

async function main() {
  console.log(`Seeding Sanity project ${projectId}/${dataset}...\n`);
  await deleteExistingPostsAndAuthors();
  await seedAuthors();
  await seedPosts();
  console.log("\nDone. Refresh http://localhost:5001 to see them.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
