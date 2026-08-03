import type { Milestone, Paper, ProgramProject, Trial } from "./schema";

/** U.S. scope used by the 2026-08-03 evidence audit. */
export const usOrganizationSlugs = [
  "abbott-neuromodulation",
  "advanced-bionics",
  "albert-einstein-college-of-medicine-neurotechnology",
  "allen-institute-for-brain-science-neurotechnology",
  "alljoined",
  "alpha-stim",
  "alto-neuroscience",
  "altoida",
  "ampa-health",
  "aora",
  "apollo-neuro",
  "arctop",
  "asu-neural-interface",
  "athinoula-a-martinos-center-for-biomedical-imaging-neurotechnology",
  "atlas-wearable",
  "atom-limbs",
  "attune-neurosciences",
  "augmental",
  "aural-analytics",
  "awear",
  "axiobionics",
  "axoft",
  "axonics",
  "barrow-neurological-institute-neurotechnology",
  "baylor-college-of-medicine-neurotechnology",
  "beacon-biosignals",
  "bico-formerly-cellink-neuracle-neuroscience",
  "biological-input-output-systems",
  "bionaut-labs",
  "bioness",
  "bioventus-neurology",
  "blackrock-neurotech",
  "boston-scientific-neuromodulation",
  "brainbit",
  "braincheck",
  "braingate-consortium",
  "brainkey",
  "brainscope",
  "brigham-and-women-s-hospital-neurotechnology",
  "brown-university-neurotechnology",
  "cadence-neuroscience",
  "cadwell",
  "cahira-technologies",
  "cala-health",
  "caltech-fus-bmi",
  "carilion-roanoke-memorial-hospital-neurotechnology",
  "cmu-tfus-bci",
  "case-western-neural-engineering",
  "cerevia-neurosciences",
  "ceribell",
  "cgx-cognionics",
  "cionic",
  "clarity-technologies",
  "cleveland-clinic-neurotechnology",
  "coapt",
  "cognionics",
  "cognision",
  "cognito-therapeutics",
  "cognivue",
  "cognixion",
  "cognixion-one",
  "cognoa",
  "cogwear",
  "columbia-neurotechnology",
  "cordance-medical",
  "cornell-neurotechnology",
  "dartmouth-college-neurotechnology",
  "decervo",
  "donald-and-barbara-zucker-school-of-medicine-at-hofstra-northwell-neurotechnology",
  "duke-neuroengineering",
  "duke-medical-center-neurotechnology",
  "eeg-info",
  "ekso-bionics",
  "emory-university-neurotechnology",
  "emotiv",
  "eneura-edb82",
  "enspire-dbs-therapy",
  "envoy-medical",
  "epitel",
  "evoke-neuroscience",
  "feinstein-institute-for-medical-research-neurotechnology",
  "fisher-wallace-labs",
  "florida-international-university-neurotechnology",
  "forest-neurotech",
  "georgia-tech-neural-interfaces",
  "harvard-university-neurotechnology",
  "helius-medical",
  "henry-ford-health-system-neurotechnology",
  "howard-hughes-medical-institute-neurotechnology",
  "icahn-school-of-medicine-at-mount-sinai-neurotechnology",
  "inner-cosmos",
  "inspire-medical-systems",
  "intactis-bio",
  "intan-technologies",
  "intheon",
  "iotamotion",
  "johns-hopkins-medicine-neurotechnology",
  "johns-hopkins-neuroengineering",
  "johns-hopkins-university-applied-physics-laboratory-neurotechnology",
  "kernel-flow",
  "kyma-neuro",
  "massachusetts-general-hospital-neurotechnology",
  "massachusetts-institute-of-technology-neurotechnology",
  "mayo-clinic-neurotechnology",
  "medical-university-of-south-carolina-neurotechnology",
  "medtronic-neuromodulation",
  "microtransponder",
  "mind-research-institute-neurotechnology",
  "mobia-medical",
  "mobius-bionics",
  "motif-neurotech",
  "myndscape",
  "myneurva",
  "myomo",
  "nalu-medical",
  "natus-medical",
  "neosensory",
  "neurable",
  "neurable-mw75",
  "neural-analytics",
  "neuralink-prime",
  "neuraptive",
  "neurokinetics",
  "neuro42",
  "neurofus-sonic-concepts",
  "neurolife",
  "neurometrix",
  "neuromore",
  "neuronetics",
  "neuroone-medical",
  "neuropace-rns",
  "neurosciences-institute-neurotechnology",
  "neurosigma",
  "neurosity-crown",
  "neurosky",
  "neurovigil",
  "nevro",
  "nexalin-technology",
  "nextsense",
  "nico-corporation",
  "northwestern-neurotechnology",
  "nudge",
  "nurolux",
  "nyu-langone-health-neurotechnology",
  "nyu-neural-science",
  "open-ephys",
  "openbci",
  "openbci-galea",
  "openwater-lifu",
  "oregon-health-and-science-university-neurotechnology",
  "otolith-labs",
  "palo-alto-university-neurotechnology",
  "paradromics-connexus",
  "parley-neurotech",
  "pennsylvania-state-university-neurotechnology",
  "persyst",
  "photopharmics",
  "precision-layer-7",
  "princeton-neural-circuits",
  "providence-va-medical-center-neurotechnology",
  "psyonic",
  "purdue-university-west-lafayette-neurotechnology",
  "quantanosis",
  "rapidai",
  "respicardia",
  "rewalk-robotics",
  "rhythmlink",
  "rice-neural-engineering",
  "ripple-neuro",
  "rune-labs",
  "science-corp",
  "setpoint-medical",
  "shirley-ryan-abilitylab-neurotechnology",
  "sonavex",
  "sond",
  "sononeu-sonogenetics",
  "soterix-medical",
  "spaulding-rehabilitation-hospital-neurotechnology",
  "spr-therapeutics",
  "stanford-nptl",
  "surgical-theater",
  "synchron-stentrode",
  "the-neurological-institute-neurotechnology",
  "the-university-of-texas-at-dallas-neurotechnology",
  "the-university-of-texas-southwestern-medical-center-neurotechnology",
  "thync",
  "uc-berkeley-neurotechnology",
  "uc-davis-speech-neuroprosthesis",
  "ucla-neural-engineering",
  "ucsf-bravo",
  "university-of-arizona-neurotechnology",
  "university-of-california-san-diego-neurotechnology",
  "university-of-chicago-neurotechnology",
  "university-of-colorado-denver-neurotechnology",
  "university-of-florida-neurotechnology",
  "university-of-miami-neurotechnology",
  "umich-direct-bci",
  "umn-neuroengineering",
  "university-of-north-carolina-at-chapel-hill-neurotechnology",
  "upenn-neuroengineering",
  "pitt-rnel",
  "utah-bionic-engineering",
  "university-of-virginia-neurotechnology",
  "uw-neurotechnology",
  "usc-neural-prosthetics",
  "ut-austin-neural-engineering",
  "vanderbilt-neural-engineering",
  "virginia-tech-neurotechnology",
  "vivosense",
  "viz-ai",
  "wustl-neurotechnology",
  "winnmed-neurotechnology",
  "wvu-rni-lifu",
  "yale-rtfmri-bci",
  "zeto"
] as const;

export const usEvidencePapers: Paper[] = [
  {
    "id": "us-paper-albert-einstein-college-of-medicine-neurotechnology",
    "title": "Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System",
    "companySlug": "albert-einstein-college-of-medicine-neurotechnology",
    "dateLabel": "14 Mar 2023",
    "sortDate": "2023-03-14",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Albert Einstein College of Medicine reports “Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System",
        "url": "https://doi.org/10.1212/wnl.0000000000201707",
        "publisher": "Ovid Technologies (Wolters Kluwer Health)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-allen-institute-for-brain-science-neurotechnology",
    "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
    "companySlug": "allen-institute-for-brain-science-neurotechnology",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Allen Institute for Brain Science reports “A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
        "url": "https://doi.org/10.1038/s41591-024-03341-8",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-alljoined",
    "title": "ENIGMA: EEG-to-Image in 15 Minutes Using Less Than 1% of the Parameters",
    "companySlug": "alljoined",
    "dateLabel": "10 Feb 2026",
    "sortDate": "2026-02-10",
    "evidenceLevel": "E2",
    "summary": "A preprint linked from Alljoined's research profile reports “ENIGMA: EEG-to-Image in 15 Minutes Using Less Than 1% of the Parameters”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "ENIGMA: EEG-to-Image in 15 Minutes Using Less Than 1% of the Parameters",
        "url": "http://arxiv.org/abs/2602.10361",
        "publisher": "arxiv.org",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-altoida",
    "title": "Overcoming the diagnostic gap in mild cognitive impairment in Parkinson’s disease: a pilot study employing a machine learning-/augmented reality-based digital biomarker",
    "companySlug": "altoida",
    "dateLabel": "1 Jun 2026",
    "sortDate": "2026-06-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Altoida's research profile reports “Overcoming the diagnostic gap in mild cognitive impairment in Parkinson’s disease: a pilot study employing a machine learning-/augmented reality-based digital biomarker”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Overcoming the diagnostic gap in mild cognitive impairment in Parkinson’s disease: a pilot study employing a machine learning-/augmented reality-based digital biomarker",
        "url": "https://doi.org/10.3389/fnagi.2026.1839000",
        "publisher": "Frontiers Media SA",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-asu-neural-interface",
    "title": "Peripheral Neural Interface",
    "companySlug": "asu-neural-interface",
    "dateLabel": "1 Jan 2019",
    "sortDate": "2019-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Arizona State University Neural Interface Research reports “Peripheral Neural Interface”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Peripheral Neural Interface",
        "url": "https://doi.org/10.1007/978-981-13-2050-7_4",
        "publisher": "Advances in experimental medicine and biology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-athinoula-a-martinos-center-for-biomedical-imaging-neurotechnology",
    "title": "Model-based navigation of transcranial focused ultrasound neuromodulation in humans: Application to targeting the amygdala and thalamus",
    "companySlug": "athinoula-a-martinos-center-for-biomedical-imaging-neurotechnology",
    "dateLabel": "Jul 2024",
    "sortDate": "2024-07-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Athinoula A. Martinos Center for Biomedical Imaging reports “Model-based navigation of transcranial focused ultrasound neuromodulation in humans: Application to targeting the amygdala and thalamus”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Model-based navigation of transcranial focused ultrasound neuromodulation in humans: Application to targeting the amygdala and thalamus",
        "url": "https://doi.org/10.1016/j.brs.2024.07.019",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-barrow-neurological-institute-neurotechnology",
    "title": "Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System",
    "companySlug": "barrow-neurological-institute-neurotechnology",
    "dateLabel": "14 Mar 2023",
    "sortDate": "2023-03-14",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Barrow Neurological Institute reports “Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System",
        "url": "https://doi.org/10.1212/wnl.0000000000201707",
        "publisher": "Ovid Technologies (Wolters Kluwer Health)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-baylor-college-of-medicine-neurotechnology",
    "title": "Neurofeedback: new territories and neurocognitive mechanisms of endogenous neuromodulation",
    "companySlug": "baylor-college-of-medicine-neurotechnology",
    "dateLabel": "21 Oct 2024",
    "sortDate": "2024-10-21",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Baylor College of Medicine reports “Neurofeedback: new territories and neurocognitive mechanisms of endogenous neuromodulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Neurofeedback: new territories and neurocognitive mechanisms of endogenous neuromodulation",
        "url": "https://doi.org/10.1098/rstb.2023.0081",
        "publisher": "The Royal Society",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-braincheck",
    "title": "A Rapid, Mobile Neurocognitive Screening Test to Aid in Identifying Cognitive Impairment and Dementia (BrainCheck): Cohort Study",
    "companySlug": "braincheck",
    "dateLabel": "21 Mar 2019",
    "sortDate": "2019-03-21",
    "evidenceLevel": "E4",
    "summary": "A publication linked from BrainCheck's research profile reports “A Rapid, Mobile Neurocognitive Screening Test to Aid in Identifying Cognitive Impairment and Dementia (BrainCheck): Cohort Study”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "A Rapid, Mobile Neurocognitive Screening Test to Aid in Identifying Cognitive Impairment and Dementia (BrainCheck): Cohort Study",
        "url": "https://doi.org/10.2196/12615",
        "publisher": "JMIR Publications Inc.",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-brainscope",
    "title": "Derivation of an intrinsic brain activity biomarker for the earliest prediction of cognitive decline",
    "companySlug": "brainscope",
    "dateLabel": "22 Jan 2026",
    "sortDate": "2026-01-22",
    "evidenceLevel": "E2",
    "summary": "A publication linked from BrainScope's research profile reports “Derivation of an intrinsic brain activity biomarker for the earliest prediction of cognitive decline”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Derivation of an intrinsic brain activity biomarker for the earliest prediction of cognitive decline",
        "url": "https://doi.org/10.1038/s41598-026-35144-x",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-brigham-and-women-s-hospital-neurotechnology",
    "title": "ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation",
    "companySlug": "brigham-and-women-s-hospital-neurotechnology",
    "dateLabel": "Nov 2025",
    "sortDate": "2025-11-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Brigham and Women's Hospital reports “ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation",
        "url": "https://doi.org/10.1016/j.brs.2025.10.007",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-brown-university-neurotechnology",
    "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
    "companySlug": "brown-university-neurotechnology",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Brown University reports “A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
        "url": "https://doi.org/10.1038/s41591-024-03341-8",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-carilion-roanoke-memorial-hospital-neurotechnology",
    "title": "Low-intensity focused ultrasound to the posterior insula reduces temporal summation of pain",
    "companySlug": "carilion-roanoke-memorial-hospital-neurotechnology",
    "dateLabel": "Jul 2024",
    "sortDate": "2024-07-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Carilion Roanoke Memorial Hospital reports “Low-intensity focused ultrasound to the posterior insula reduces temporal summation of pain”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Low-intensity focused ultrasound to the posterior insula reduces temporal summation of pain",
        "url": "https://doi.org/10.1016/j.brs.2024.07.020",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-case-western-neural-engineering",
    "title": "Deep brain stimulation: current challenges and future directions",
    "companySlug": "case-western-neural-engineering",
    "dateLabel": "1 Mar 2019",
    "sortDate": "2019-03-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Case Western Neural Engineering Research reports “Deep brain stimulation: current challenges and future directions”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Deep brain stimulation: current challenges and future directions",
        "url": "https://doi.org/10.1038/s41582-018-0128-2",
        "publisher": "Nature reviews. Neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-cleveland-clinic-neurotechnology",
    "title": "Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System",
    "companySlug": "cleveland-clinic-neurotechnology",
    "dateLabel": "14 Mar 2023",
    "sortDate": "2023-03-14",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Cleveland Clinic reports “Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Interim Safety Profile From the Feasibility Study of the BrainGate Neural Interface System",
        "url": "https://doi.org/10.1212/wnl.0000000000201707",
        "publisher": "Ovid Technologies (Wolters Kluwer Health)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-cognoa",
    "title": "Increased delay from initial concern to diagnosis of autism spectrum disorder and associated health care resource utilization and cost among children aged younger than 6 years in the United States.",
    "companySlug": "cognoa",
    "dateLabel": "2023",
    "sortDate": "2023-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Cognoa's research profile reports “Increased delay from initial concern to diagnosis of autism spectrum disorder and associated health care resource utilization and cost among children aged younger than 6 years in the United States.”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Increased delay from initial concern to diagnosis of autism spectrum disorder and associated health care resource utilization and cost among children aged younger than 6 years in the United States.",
        "url": "https://doi.org/10.18553/jmcp.2023.29.4.378",
        "publisher": "Journal of managed care & specialty pharmacy",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-columbia-neurotechnology",
    "title": "Cancer Pain Management-New Therapies",
    "companySlug": "columbia-neurotechnology",
    "dateLabel": "26 Jan 2022",
    "sortDate": "2022-01-26",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Columbia Neurotechnology Research reports “Cancer Pain Management-New Therapies”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Cancer Pain Management-New Therapies",
        "url": "https://doi.org/10.1007/s11912-021-01166-z",
        "publisher": "Current oncology reports",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-cordance-medical",
    "title": "First-in-human prospective trial of sonobiopsy in high-grade glioma patients using neuronavigation-guided focused ultrasound",
    "companySlug": "cordance-medical",
    "dateLabel": "16 Sept 2023",
    "sortDate": "2023-09-16",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Cordance Medical's research profile reports “First-in-human prospective trial of sonobiopsy in high-grade glioma patients using neuronavigation-guided focused ultrasound”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "First-in-human prospective trial of sonobiopsy in high-grade glioma patients using neuronavigation-guided focused ultrasound",
        "url": "https://doi.org/10.1038/s41698-023-00448-y",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-cornell-neurotechnology",
    "title": "Safety and Efficacy of Staged, Bilateral Focused Ultrasound Thalamotomy in Essential Tremor: An Open-Label Clinical Trial",
    "companySlug": "cornell-neurotechnology",
    "dateLabel": "1 Sept 2024",
    "sortDate": "2024-09-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Cornell Neurotechnology Research reports “Safety and Efficacy of Staged, Bilateral Focused Ultrasound Thalamotomy in Essential Tremor: An Open-Label Clinical Trial”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Safety and Efficacy of Staged, Bilateral Focused Ultrasound Thalamotomy in Essential Tremor: An Open-Label Clinical Trial",
        "url": "https://doi.org/10.1001/jamaneurol.2024.2295",
        "publisher": "JAMA neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-dartmouth-college-neurotechnology",
    "title": "A biodegradable and flexible neural interface for transdermal optoelectronic modulation and regeneration of peripheral nerves",
    "companySlug": "dartmouth-college-neurotechnology",
    "dateLabel": "3 Jun 2024",
    "sortDate": "2024-06-03",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Dartmouth College reports “A biodegradable and flexible neural interface for transdermal optoelectronic modulation and regeneration of peripheral nerves”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A biodegradable and flexible neural interface for transdermal optoelectronic modulation and regeneration of peripheral nerves",
        "url": "https://doi.org/10.1038/s41467-024-49166-4",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-donald-and-barbara-zucker-school-of-medicine-at-hofstra-northwell-neurotechnology",
    "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
    "companySlug": "donald-and-barbara-zucker-school-of-medicine-at-hofstra-northwell-neurotechnology",
    "dateLabel": "20 Jul 2024",
    "sortDate": "2024-07-20",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Donald & Barbara Zucker School of Medicine at Hofstra/Northwell reports “Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
        "url": "https://doi.org/10.1038/s41467-024-50523-6",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-duke-neuroengineering",
    "title": "Technology of deep brain stimulation: current status and future directions",
    "companySlug": "duke-neuroengineering",
    "dateLabel": "26 Nov 2020",
    "sortDate": "2020-11-26",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Duke Center for Neuroengineering reports “Technology of deep brain stimulation: current status and future directions”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Technology of deep brain stimulation: current status and future directions",
        "url": "https://doi.org/10.1038/s41582-020-00426-z",
        "publisher": "Nature reviews. Neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-duke-medical-center-neurotechnology",
    "title": "Five-Year Longitudinal Follow-Up of Restorative Neurostimulation Shows Durability of Effectiveness in Patients With Refractory Chronic Low Back Pain Associated With Multifidus Muscle Dysfunction",
    "companySlug": "duke-medical-center-neurotechnology",
    "dateLabel": "Jul 2024",
    "sortDate": "2024-07-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Duke Medical Center reports “Five-Year Longitudinal Follow-Up of Restorative Neurostimulation Shows Durability of Effectiveness in Patients With Refractory Chronic Low Back Pain Associated With Multifidus Muscle Dysfunction”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Five-Year Longitudinal Follow-Up of Restorative Neurostimulation Shows Durability of Effectiveness in Patients With Refractory Chronic Low Back Pain Associated With Multifidus Muscle Dysfunction",
        "url": "https://doi.org/10.1016/j.neurom.2024.01.006",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-emory-university-neurotechnology",
    "title": "Closed-loop Neuromotor Training System Pairing Transcutaneous Vagus Nerve Stimulation with Video-based Real-time Movement Classification",
    "companySlug": "emory-university-neurotechnology",
    "dateLabel": "23 May 2025",
    "sortDate": "2025-05-23",
    "evidenceLevel": "E2",
    "summary": "A preprint with author affiliation to Emory University reports “Closed-loop Neuromotor Training System Pairing Transcutaneous Vagus Nerve Stimulation with Video-based Real-time Movement Classification”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Closed-loop Neuromotor Training System Pairing Transcutaneous Vagus Nerve Stimulation with Video-based Real-time Movement Classification",
        "url": "https://doi.org/10.1101/2025.05.23.25327218",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-feinstein-institute-for-medical-research-neurotechnology",
    "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
    "companySlug": "feinstein-institute-for-medical-research-neurotechnology",
    "dateLabel": "20 Jul 2024",
    "sortDate": "2024-07-20",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Feinstein Institute for Medical Research reports “Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
        "url": "https://doi.org/10.1038/s41467-024-50523-6",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-florida-international-university-neurotechnology",
    "title": "Effectiveness of deep brain stimulation on refractory aggression in pediatric patients with autism and severe intellectual disability: meta-analytic review",
    "companySlug": "florida-international-university-neurotechnology",
    "dateLabel": "30 Jul 2024",
    "sortDate": "2024-07-30",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Florida International University reports “Effectiveness of deep brain stimulation on refractory aggression in pediatric patients with autism and severe intellectual disability: meta-analytic review”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Effectiveness of deep brain stimulation on refractory aggression in pediatric patients with autism and severe intellectual disability: meta-analytic review",
        "url": "https://doi.org/10.1186/s12887-024-04920-x",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-georgia-tech-neural-interfaces",
    "title": "Cingulate dynamics track depression recovery with deep brain stimulation",
    "companySlug": "georgia-tech-neural-interfaces",
    "dateLabel": "20 Sept 2023",
    "sortDate": "2023-09-20",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Georgia Tech Neural Interfaces Research reports “Cingulate dynamics track depression recovery with deep brain stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Cingulate dynamics track depression recovery with deep brain stimulation",
        "url": "https://doi.org/10.1038/s41586-023-06541-3",
        "publisher": "Nature",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-harvard-university-neurotechnology",
    "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
    "companySlug": "harvard-university-neurotechnology",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Harvard University reports “A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
        "url": "https://doi.org/10.1038/s41591-024-03341-8",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-henry-ford-health-system-neurotechnology",
    "title": "Neural modulation enhancement using connectivity-based EEG neurofeedback with simultaneous fMRI for emotion regulation",
    "companySlug": "henry-ford-health-system-neurotechnology",
    "dateLabel": "Oct 2023",
    "sortDate": "2023-10-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Henry Ford Health System reports “Neural modulation enhancement using connectivity-based EEG neurofeedback with simultaneous fMRI for emotion regulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Neural modulation enhancement using connectivity-based EEG neurofeedback with simultaneous fMRI for emotion regulation",
        "url": "https://doi.org/10.1016/j.neuroimage.2023.120320",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-howard-hughes-medical-institute-neurotechnology",
    "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
    "companySlug": "howard-hughes-medical-institute-neurotechnology",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Howard Hughes Medical Institute reports “A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
        "url": "https://doi.org/10.1038/s41591-024-03341-8",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-icahn-school-of-medicine-at-mount-sinai-neurotechnology",
    "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
    "companySlug": "icahn-school-of-medicine-at-mount-sinai-neurotechnology",
    "dateLabel": "20 Jul 2024",
    "sortDate": "2024-07-20",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Icahn School of Medicine at Mount Sinai reports “Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
        "url": "https://doi.org/10.1038/s41467-024-50523-6",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-inner-cosmos",
    "title": "Defining Surgical Terminology and Risk for Brain Computer Interface Technologies",
    "companySlug": "inner-cosmos",
    "dateLabel": "26 Mar 2021",
    "sortDate": "2021-03-26",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Inner Cosmos's research profile reports “Defining Surgical Terminology and Risk for Brain Computer Interface Technologies”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Defining Surgical Terminology and Risk for Brain Computer Interface Technologies",
        "url": "https://doi.org/10.3389/fnins.2021.599549",
        "publisher": "Frontiers in Neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-johns-hopkins-medicine-neurotechnology",
    "title": "Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS",
    "companySlug": "johns-hopkins-medicine-neurotechnology",
    "dateLabel": "26 Apr 2024",
    "sortDate": "2024-04-26",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Johns Hopkins Medicine reports “Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS",
        "url": "https://doi.org/10.1038/s41598-024-60277-2",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-johns-hopkins-neuroengineering",
    "title": "Pharmacotherapy and non-invasive neuromodulation for neuropathic pain: a systematic review and meta-analysis",
    "companySlug": "johns-hopkins-neuroengineering",
    "dateLabel": "1 May 2025",
    "sortDate": "2025-05-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Johns Hopkins Neuroengineering Research reports “Pharmacotherapy and non-invasive neuromodulation for neuropathic pain: a systematic review and meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Pharmacotherapy and non-invasive neuromodulation for neuropathic pain: a systematic review and meta-analysis",
        "url": "https://doi.org/10.1016/S1474-4422(25)00068-7",
        "publisher": "The Lancet. Neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-johns-hopkins-university-applied-physics-laboratory-neurotechnology",
    "title": "Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS",
    "companySlug": "johns-hopkins-university-applied-physics-laboratory-neurotechnology",
    "dateLabel": "26 Apr 2024",
    "sortDate": "2024-04-26",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Johns Hopkins University Applied Physics Laboratory reports “Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS",
        "url": "https://doi.org/10.1038/s41598-024-60277-2",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-massachusetts-general-hospital-neurotechnology",
    "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
    "companySlug": "massachusetts-general-hospital-neurotechnology",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Massachusetts General Hospital reports “A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
        "url": "https://doi.org/10.1038/s41591-024-03341-8",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-massachusetts-institute-of-technology-neurotechnology",
    "title": "Anisotropic hydrogel microelectrodes for intraspinal neural recordings in vivo",
    "companySlug": "massachusetts-institute-of-technology-neurotechnology",
    "dateLabel": "28 Jan 2025",
    "sortDate": "2025-01-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Massachusetts Institute of Technology reports “Anisotropic hydrogel microelectrodes for intraspinal neural recordings in vivo”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Anisotropic hydrogel microelectrodes for intraspinal neural recordings in vivo",
        "url": "https://doi.org/10.1038/s41467-025-56450-4",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-mayo-clinic-neurotechnology",
    "title": "State of Practice on Transcranial MR-Guided Focused Ultrasound: A Report from the ASNR Standards and Guidelines Committee and ACR Commission on Neuroradiology Workgroup",
    "companySlug": "mayo-clinic-neurotechnology",
    "dateLabel": "21 Nov 2024",
    "sortDate": "2024-11-21",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Mayo Clinic reports “State of Practice on Transcranial MR-Guided Focused Ultrasound: A Report from the ASNR Standards and Guidelines Committee and ACR Commission on Neuroradiology Workgroup”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "State of Practice on Transcranial MR-Guided Focused Ultrasound: A Report from the ASNR Standards and Guidelines Committee and ACR Commission on Neuroradiology Workgroup",
        "url": "https://doi.org/10.3174/ajnr.a8405",
        "publisher": "American Society of Neuroradiology (ASNR)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-medical-university-of-south-carolina-neurotechnology",
    "title": "A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium",
    "companySlug": "medical-university-of-south-carolina-neurotechnology",
    "dateLabel": "Mar 2025",
    "sortDate": "2025-03-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Medical University of South Carolina reports “A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium",
        "url": "https://doi.org/10.1016/j.clinph.2025.01.004",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-mind-research-institute-neurotechnology",
    "title": "A clinical grade neurostimulation implant for hierarchical control of physiological activity",
    "companySlug": "mind-research-institute-neurotechnology",
    "dateLabel": "22 Oct 2025",
    "sortDate": "2025-10-22",
    "evidenceLevel": "E2",
    "summary": "A preprint with author affiliation to MIND Research Institute reports “A clinical grade neurostimulation implant for hierarchical control of physiological activity”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A clinical grade neurostimulation implant for hierarchical control of physiological activity",
        "url": "https://doi.org/10.1101/2025.10.21.683630",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-neurosciences-institute-neurotechnology",
    "title": "An artefact-resilient wide bandwidth bidirectional graphene neural interface",
    "companySlug": "neurosciences-institute-neurotechnology",
    "dateLabel": "28 May 2026",
    "sortDate": "2026-05-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Neurosciences Institute reports “An artefact-resilient wide bandwidth bidirectional graphene neural interface”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "An artefact-resilient wide bandwidth bidirectional graphene neural interface",
        "url": "https://doi.org/10.1038/s41467-026-73790-x",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-northwestern-neurotechnology",
    "title": "Dystonia",
    "companySlug": "northwestern-neurotechnology",
    "dateLabel": "20 Sept 2018",
    "sortDate": "2018-09-20",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Northwestern Neurotechnology Research reports “Dystonia”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Dystonia",
        "url": "https://doi.org/10.1038/s41572-018-0023-6",
        "publisher": "Nature reviews. Disease primers",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-nudge",
    "title": "Behavioral effects of targeting the central thalamus and pulvinar with transcranial ultrasound stimulation in healthy volunteers",
    "companySlug": "nudge",
    "dateLabel": "2 Mar 2025",
    "sortDate": "2025-03-02",
    "evidenceLevel": "E2",
    "summary": "A preprint linked from Nudge's research profile reports “Behavioral effects of targeting the central thalamus and pulvinar with transcranial ultrasound stimulation in healthy volunteers”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Behavioral effects of targeting the central thalamus and pulvinar with transcranial ultrasound stimulation in healthy volunteers",
        "url": "https://doi.org/10.1101/2025.02.27.640692",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-nyu-langone-health-neurotechnology",
    "title": "Holographic transcranial ultrasound neuromodulation enhances stimulation efficacy by cooperatively recruiting distributed brain circuits",
    "companySlug": "nyu-langone-health-neurotechnology",
    "dateLabel": "7 Jul 2025",
    "sortDate": "2025-07-07",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to NYU Langone Health reports “Holographic transcranial ultrasound neuromodulation enhances stimulation efficacy by cooperatively recruiting distributed brain circuits”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Holographic transcranial ultrasound neuromodulation enhances stimulation efficacy by cooperatively recruiting distributed brain circuits",
        "url": "https://doi.org/10.1038/s41551-025-01449-x",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-nyu-neural-science",
    "title": "Oxytocin, Neural Plasticity, and Social Behavior",
    "companySlug": "nyu-neural-science",
    "dateLabel": "6 Apr 2021",
    "sortDate": "2021-04-06",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to NYU Neural Science Research reports “Oxytocin, Neural Plasticity, and Social Behavior”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Oxytocin, Neural Plasticity, and Social Behavior",
        "url": "https://doi.org/10.1146/annurev-neuro-102320-102847",
        "publisher": "Annual review of neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-openwater-lifu",
    "title": "The effect of non-invasive transcranial focused ultrasound for depression on the default mode network: an open-label pilot trial",
    "companySlug": "openwater-lifu",
    "dateLabel": "20 Jan 2026",
    "sortDate": "2026-01-20",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Openwater Open-LIFU's research profile reports “The effect of non-invasive transcranial focused ultrasound for depression on the default mode network: an open-label pilot trial”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "The effect of non-invasive transcranial focused ultrasound for depression on the default mode network: an open-label pilot trial",
        "url": "https://doi.org/10.3389/fpsyt.2025.1722575",
        "publisher": "Frontiers in Psychiatry",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-oregon-health-and-science-university-neurotechnology",
    "title": "Dual Treatment of Refractory Focal Epilepsy and Obsessive-Compulsive Disorder With Intracranial Responsive Neurostimulation",
    "companySlug": "oregon-health-and-science-university-neurotechnology",
    "dateLabel": "Aug 2024",
    "sortDate": "2024-08-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Oregon Health & Science University reports “Dual Treatment of Refractory Focal Epilepsy and Obsessive-Compulsive Disorder With Intracranial Responsive Neurostimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Dual Treatment of Refractory Focal Epilepsy and Obsessive-Compulsive Disorder With Intracranial Responsive Neurostimulation",
        "url": "https://doi.org/10.1212/cpj.0000000000200318",
        "publisher": "Ovid Technologies (Wolters Kluwer Health)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-otolith-labs",
    "title": "Exploring vestibular stimulation to reduce the influence of cybersickness on virtual reality experiences",
    "companySlug": "otolith-labs",
    "dateLabel": "23 Jan 2025",
    "sortDate": "2025-01-23",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Otolith Labs's research profile reports “Exploring vestibular stimulation to reduce the influence of cybersickness on virtual reality experiences”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Exploring vestibular stimulation to reduce the influence of cybersickness on virtual reality experiences",
        "url": "https://doi.org/10.3389/frvir.2024.1478106",
        "publisher": "Frontiers Media SA",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-palo-alto-university-neurotechnology",
    "title": "Frontal midline theta transcranial alternating current stimulation enhances early consolidation of episodic memory",
    "companySlug": "palo-alto-university-neurotechnology",
    "dateLabel": "16 Feb 2024",
    "sortDate": "2024-02-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Palo Alto University reports “Frontal midline theta transcranial alternating current stimulation enhances early consolidation of episodic memory”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Frontal midline theta transcranial alternating current stimulation enhances early consolidation of episodic memory",
        "url": "https://doi.org/10.1038/s41539-024-00222-0",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-pennsylvania-state-university-neurotechnology",
    "title": "Low intensity focused ultrasound stimulation in stroke: A phase I safety &amp; feasibility trial",
    "companySlug": "pennsylvania-state-university-neurotechnology",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Pennsylvania State University reports “Low intensity focused ultrasound stimulation in stroke: A phase I safety &amp; feasibility trial”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Low intensity focused ultrasound stimulation in stroke: A phase I safety &amp; feasibility trial",
        "url": "https://doi.org/10.1016/j.brs.2025.01.015",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-princeton-neural-circuits",
    "title": "Hypothalamic deep brain stimulation augments walking after spinal cord injury",
    "companySlug": "princeton-neural-circuits",
    "dateLabel": "2 Dec 2024",
    "sortDate": "2024-12-02",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Princeton Neural Circuits Research reports “Hypothalamic deep brain stimulation augments walking after spinal cord injury”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Hypothalamic deep brain stimulation augments walking after spinal cord injury",
        "url": "https://doi.org/10.1038/s41591-024-03306-x",
        "publisher": "Nature medicine",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-providence-va-medical-center-neurotechnology",
    "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
    "companySlug": "providence-va-medical-center-neurotechnology",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Providence VA Medical Center reports “A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A high-performance brain–computer interface for finger decoding and quadcopter game control in an individual with paralysis",
        "url": "https://doi.org/10.1038/s41591-024-03341-8",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-psyonic",
    "title": "3D-Printing Hands that Feel",
    "companySlug": "psyonic",
    "dateLabel": "15 Mar 2021",
    "sortDate": "2021-03-15",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Psyonic's research profile reports “3D-Printing Hands that Feel”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "3D-Printing Hands that Feel",
        "url": "https://doi.org/10.1145/3457356.3457360",
        "publisher": "Association for Computing Machinery (ACM)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-purdue-university-west-lafayette-neurotechnology",
    "title": "Neural Plasticity in Sensorimotor Brain–Machine Interfaces",
    "companySlug": "purdue-university-west-lafayette-neurotechnology",
    "dateLabel": "8 Jun 2023",
    "sortDate": "2023-06-08",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Purdue University West Lafayette reports “Neural Plasticity in Sensorimotor Brain–Machine Interfaces”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Neural Plasticity in Sensorimotor Brain–Machine Interfaces",
        "url": "https://doi.org/10.1146/annurev-bioeng-110220-110833",
        "publisher": "Annual Reviews",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-rice-neural-engineering",
    "title": "Deep Brain Stimulation for Obsessive-Compulsive Disorder: Optimal Stimulation Sites",
    "companySlug": "rice-neural-engineering",
    "dateLabel": "21 Dec 2023",
    "sortDate": "2023-12-21",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Rice Neural Engineering Research reports “Deep Brain Stimulation for Obsessive-Compulsive Disorder: Optimal Stimulation Sites”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Deep Brain Stimulation for Obsessive-Compulsive Disorder: Optimal Stimulation Sites",
        "url": "https://doi.org/10.1016/j.biopsych.2023.12.010",
        "publisher": "Biological psychiatry",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-science-corp",
    "title": "Subretinal Photovoltaic Implant to Restore Vision in Geographic Atrophy Due to AMD.",
    "companySlug": "science-corp",
    "dateLabel": "2026",
    "sortDate": "2026-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Science Corporation's research profile reports “Subretinal Photovoltaic Implant to Restore Vision in Geographic Atrophy Due to AMD.”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Subretinal Photovoltaic Implant to Restore Vision in Geographic Atrophy Due to AMD.",
        "url": "https://doi.org/10.1056/NEJMoa2501396",
        "publisher": "The New England journal of medicine",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-shirley-ryan-abilitylab-neurotechnology",
    "title": "Quantifying physical degradation alongside recording and stimulation performance of 980 intracortical microelectrodes chronically implanted in three humans for 956-2246 days",
    "companySlug": "shirley-ryan-abilitylab-neurotechnology",
    "dateLabel": "10 Sept 2024",
    "sortDate": "2024-09-10",
    "evidenceLevel": "E2",
    "summary": "A preprint with author affiliation to Shirley Ryan AbilityLab reports “Quantifying physical degradation alongside recording and stimulation performance of 980 intracortical microelectrodes chronically implanted in three humans for 956-2246 days”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Quantifying physical degradation alongside recording and stimulation performance of 980 intracortical microelectrodes chronically implanted in three humans for 956-2246 days",
        "url": "https://doi.org/10.1101/2024.09.09.24313281",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-spaulding-rehabilitation-hospital-neurotechnology",
    "title": "An EEG motor imagery dataset for brain computer interface in acute stroke patients",
    "companySlug": "spaulding-rehabilitation-hospital-neurotechnology",
    "dateLabel": "25 Jan 2024",
    "sortDate": "2024-01-25",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Spaulding Rehabilitation Hospital reports “An EEG motor imagery dataset for brain computer interface in acute stroke patients”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "An EEG motor imagery dataset for brain computer interface in acute stroke patients",
        "url": "https://doi.org/10.1038/s41597-023-02787-8",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-stanford-nptl",
    "title": "Stanford Neuromodulation Therapy (SNT): A Double-Blind Randomized Controlled Trial",
    "companySlug": "stanford-nptl",
    "dateLabel": "29 Oct 2021",
    "sortDate": "2021-10-29",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Stanford Neural Prosthetics Translational Laboratory reports “Stanford Neuromodulation Therapy (SNT): A Double-Blind Randomized Controlled Trial”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Stanford Neuromodulation Therapy (SNT): A Double-Blind Randomized Controlled Trial",
        "url": "https://doi.org/10.1176/appi.ajp.2021.20101429",
        "publisher": "The American journal of psychiatry",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-the-neurological-institute-neurotechnology",
    "title": "Reconnecting the Hand and Arm to the Brain: Efficacy of Neural Interfaces for Sensorimotor Restoration After Tetraplegia",
    "companySlug": "the-neurological-institute-neurotechnology",
    "dateLabel": "20 Nov 2023",
    "sortDate": "2023-11-20",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to The Neurological Institute reports “Reconnecting the Hand and Arm to the Brain: Efficacy of Neural Interfaces for Sensorimotor Restoration After Tetraplegia”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Reconnecting the Hand and Arm to the Brain: Efficacy of Neural Interfaces for Sensorimotor Restoration After Tetraplegia",
        "url": "https://doi.org/10.1227/neu.0000000000002769",
        "publisher": "Ovid Technologies (Wolters Kluwer Health)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-the-university-of-texas-at-dallas-neurotechnology",
    "title": "Bacteria invade the brain following intracortical microelectrode implantation, inducing gut-brain axis disruption and contributing to reduced microelectrode performance",
    "companySlug": "the-university-of-texas-at-dallas-neurotechnology",
    "dateLabel": "20 Feb 2025",
    "sortDate": "2025-02-20",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to The University of Texas at Dallas reports “Bacteria invade the brain following intracortical microelectrode implantation, inducing gut-brain axis disruption and contributing to reduced microelectrode performance”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Bacteria invade the brain following intracortical microelectrode implantation, inducing gut-brain axis disruption and contributing to reduced microelectrode performance",
        "url": "https://doi.org/10.1038/s41467-025-56979-4",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-the-university-of-texas-southwestern-medical-center-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "the-university-of-texas-southwestern-medical-center-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to The University of Texas Southwestern Medical Center reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
        "url": "https://doi.org/10.1038/s44220-026-00590-z",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-uc-berkeley-neurotechnology",
    "title": "Deep brain stimulation of the hypothalamic region: a systematic review",
    "companySlug": "uc-berkeley-neurotechnology",
    "dateLabel": "4 Feb 2025",
    "sortDate": "2025-02-04",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to UC Berkeley Neurotechnology Research reports “Deep brain stimulation of the hypothalamic region: a systematic review”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Deep brain stimulation of the hypothalamic region: a systematic review",
        "url": "https://doi.org/10.1007/s00701-025-06430-w",
        "publisher": "Acta neurochirurgica",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-ucla-neural-engineering",
    "title": "The brain-heart axis: effects of cardiovascular disease on the CNS and opportunities for central neuromodulation",
    "companySlug": "ucla-neural-engineering",
    "dateLabel": "11 Dec 2025",
    "sortDate": "2025-12-11",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to UCLA Neural Engineering Research reports “The brain-heart axis: effects of cardiovascular disease on the CNS and opportunities for central neuromodulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "The brain-heart axis: effects of cardiovascular disease on the CNS and opportunities for central neuromodulation",
        "url": "https://doi.org/10.1038/s41583-025-01000-6",
        "publisher": "Nature reviews. Neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-arizona-neurotechnology",
    "title": "Transcranial focused ultrasound to the posterior cingulate cortex modulates default mode network and subjective experience: an fMRI pilot study",
    "companySlug": "university-of-arizona-neurotechnology",
    "dateLabel": "4 Jun 2024",
    "sortDate": "2024-06-04",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Arizona reports “Transcranial focused ultrasound to the posterior cingulate cortex modulates default mode network and subjective experience: an fMRI pilot study”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Transcranial focused ultrasound to the posterior cingulate cortex modulates default mode network and subjective experience: an fMRI pilot study",
        "url": "https://doi.org/10.3389/fnhum.2024.1392199",
        "publisher": "Frontiers Media SA",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-california-san-diego-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "university-of-california-san-diego-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of California San Diego reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
        "url": "https://doi.org/10.1038/s44220-026-00590-z",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-chicago-neurotechnology",
    "title": "Conveying tactile object characteristics through customized intracortical microstimulation of the human somatosensory cortex",
    "companySlug": "university-of-chicago-neurotechnology",
    "dateLabel": "1 May 2025",
    "sortDate": "2025-05-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Chicago reports “Conveying tactile object characteristics through customized intracortical microstimulation of the human somatosensory cortex”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Conveying tactile object characteristics through customized intracortical microstimulation of the human somatosensory cortex",
        "url": "https://doi.org/10.1038/s41467-025-58616-6",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-colorado-denver-neurotechnology",
    "title": "Sapphire-Based Optrode for Low Noise Neural Recording and Optogenetic Manipulation",
    "companySlug": "university-of-colorado-denver-neurotechnology",
    "dateLabel": "6 Feb 2025",
    "sortDate": "2025-02-06",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Colorado Denver reports “Sapphire-Based Optrode for Low Noise Neural Recording and Optogenetic Manipulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Sapphire-Based Optrode for Low Noise Neural Recording and Optogenetic Manipulation",
        "url": "https://doi.org/10.1021/acschemneuro.4c00602",
        "publisher": "American Chemical Society (ACS)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-florida-neurotechnology",
    "title": "Bacteria invade the brain following intracortical microelectrode implantation, inducing gut-brain axis disruption and contributing to reduced microelectrode performance",
    "companySlug": "university-of-florida-neurotechnology",
    "dateLabel": "20 Feb 2025",
    "sortDate": "2025-02-20",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Florida reports “Bacteria invade the brain following intracortical microelectrode implantation, inducing gut-brain axis disruption and contributing to reduced microelectrode performance”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Bacteria invade the brain following intracortical microelectrode implantation, inducing gut-brain axis disruption and contributing to reduced microelectrode performance",
        "url": "https://doi.org/10.1038/s41467-025-56979-4",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-miami-neurotechnology",
    "title": "Activation of inflammasomes and their effects on neuroinflammation at the microelectrode-tissue interface in intracortical implants",
    "companySlug": "university-of-miami-neurotechnology",
    "dateLabel": "Jun 2023",
    "sortDate": "2023-06-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Miami reports “Activation of inflammasomes and their effects on neuroinflammation at the microelectrode-tissue interface in intracortical implants”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Activation of inflammasomes and their effects on neuroinflammation at the microelectrode-tissue interface in intracortical implants",
        "url": "https://doi.org/10.1016/j.biomaterials.2023.122102",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-umich-direct-bci",
    "title": "Canadian Network for Mood and Anxiety Treatments (CANMAT) 2023 Update on Clinical Guidelines for Management of Major Depressive Disorder in Adults: Réseau canadien pour les traitements de l'humeur et de l'anxiété (CANMAT) 2023 : Mise à jour des lignes directrices cliniques pour la prise en charge du trouble dépressif majeur chez les adultes",
    "companySlug": "umich-direct-bci",
    "dateLabel": "6 May 2024",
    "sortDate": "2024-05-06",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Michigan Direct Brain Interface Lab reports “Canadian Network for Mood and Anxiety Treatments (CANMAT) 2023 Update on Clinical Guidelines for Management of Major Depressive Disorder in Adults: Réseau canadien pour les traitements de l'humeur et de l'anxiété (CANMAT) 2023 : Mise à jour des lignes directrices cliniques pour la prise en charge du trouble dépressif majeur chez les adultes”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Canadian Network for Mood and Anxiety Treatments (CANMAT) 2023 Update on Clinical Guidelines for Management of Major Depressive Disorder in Adults: Réseau canadien pour les traitements de l'humeur et de l'anxiété (CANMAT) 2023 : Mise à jour des lignes directrices cliniques pour la prise en charge du trouble dépressif majeur chez les adultes",
        "url": "https://doi.org/10.1177/07067437241245384",
        "publisher": "Canadian journal of psychiatry. Revue canadienne de psychiatrie",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-umn-neuroengineering",
    "title": "Noninvasive Deep Brain Stimulation via Temporally Interfering Electric Fields",
    "companySlug": "umn-neuroengineering",
    "dateLabel": "1 Jun 2017",
    "sortDate": "2017-06-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Minnesota Neuroengineering Research reports “Noninvasive Deep Brain Stimulation via Temporally Interfering Electric Fields”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Noninvasive Deep Brain Stimulation via Temporally Interfering Electric Fields",
        "url": "https://doi.org/10.1016/j.cell.2017.05.024",
        "publisher": "Cell",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-north-carolina-at-chapel-hill-neurotechnology",
    "title": "Current clinical investigations of focused ultrasound blood-brain barrier disruption: A review",
    "companySlug": "university-of-north-carolina-at-chapel-hill-neurotechnology",
    "dateLabel": "Apr 2024",
    "sortDate": "2024-04-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of North Carolina at Chapel Hill reports “Current clinical investigations of focused ultrasound blood-brain barrier disruption: A review”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Current clinical investigations of focused ultrasound blood-brain barrier disruption: A review",
        "url": "https://doi.org/10.1016/j.neurot.2024.e00352",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-upenn-neuroengineering",
    "title": "Non-invasive brain stimulation and neuroenhancement",
    "companySlug": "upenn-neuroengineering",
    "dateLabel": "25 May 2022",
    "sortDate": "2022-05-25",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Pennsylvania Neuroengineering Research reports “Non-invasive brain stimulation and neuroenhancement”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Non-invasive brain stimulation and neuroenhancement",
        "url": "https://doi.org/10.1016/j.cnp.2022.05.002",
        "publisher": "Clinical neurophysiology practice",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-pitt-rnel",
    "title": "Biophysics of Temporal Interference Stimulation",
    "companySlug": "pitt-rnel",
    "dateLabel": "5 Nov 2020",
    "sortDate": "2020-11-05",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Pittsburgh Rehab Neural Engineering Labs reports “Biophysics of Temporal Interference Stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Biophysics of Temporal Interference Stimulation",
        "url": "https://doi.org/10.1016/j.cels.2020.10.004",
        "publisher": "Cell systems",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-utah-bionic-engineering",
    "title": "The American Society of Pain and Neuroscience (ASPN) Best Practices and Guidelines for the Interventional Management of Cancer-Associated Pain",
    "companySlug": "utah-bionic-engineering",
    "dateLabel": "16 Jul 2021",
    "sortDate": "2021-07-16",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Utah Bionic Engineering Lab reports “The American Society of Pain and Neuroscience (ASPN) Best Practices and Guidelines for the Interventional Management of Cancer-Associated Pain”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "The American Society of Pain and Neuroscience (ASPN) Best Practices and Guidelines for the Interventional Management of Cancer-Associated Pain",
        "url": "https://doi.org/10.2147/JPR.S315585",
        "publisher": "Journal of pain research",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-university-of-virginia-neurotechnology",
    "title": "Focused Ultrasound",
    "companySlug": "university-of-virginia-neurotechnology",
    "dateLabel": "21 Aug 2024",
    "sortDate": "2024-08-21",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Virginia reports “Focused Ultrasound”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Focused Ultrasound",
        "url": "https://doi.org/10.1097/rli.0000000000001116",
        "publisher": "Ovid Technologies (Wolters Kluwer Health)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-uw-neurotechnology",
    "title": "2017 Infectious Diseases Society of America's Clinical Practice Guidelines for Healthcare-Associated Ventriculitis and Meningitis",
    "companySlug": "uw-neurotechnology",
    "dateLabel": "15 Mar 2017",
    "sortDate": "2017-03-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Washington Neurotechnology Research reports “2017 Infectious Diseases Society of America's Clinical Practice Guidelines for Healthcare-Associated Ventriculitis and Meningitis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "2017 Infectious Diseases Society of America's Clinical Practice Guidelines for Healthcare-Associated Ventriculitis and Meningitis",
        "url": "https://doi.org/10.1093/cid/ciw861",
        "publisher": "Clinical infectious diseases : an official publication of the Infectious Diseases Society of America",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-usc-neural-prosthetics",
    "title": "Vagal blockade of the brain-liver axis deters cancer-associated cachexia",
    "companySlug": "usc-neural-prosthetics",
    "dateLabel": "7 Aug 2025",
    "sortDate": "2025-08-07",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to USC Neural Prosthetics Research reports “Vagal blockade of the brain-liver axis deters cancer-associated cachexia”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Vagal blockade of the brain-liver axis deters cancer-associated cachexia",
        "url": "https://doi.org/10.1016/j.cell.2025.07.016",
        "publisher": "Cell",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-ut-austin-neural-engineering",
    "title": "Semantic reconstruction of continuous language from non-invasive brain recordings",
    "companySlug": "ut-austin-neural-engineering",
    "dateLabel": "1 May 2023",
    "sortDate": "2023-05-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to UT Austin Neural Engineering Research reports “Semantic reconstruction of continuous language from non-invasive brain recordings”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Semantic reconstruction of continuous language from non-invasive brain recordings",
        "url": "https://doi.org/10.1038/s41593-023-01304-9",
        "publisher": "Nature neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-vanderbilt-neural-engineering",
    "title": "Structure and neural mechanisms of catatonia",
    "companySlug": "vanderbilt-neural-engineering",
    "dateLabel": "10 Jun 2019",
    "sortDate": "2019-06-10",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Vanderbilt Neural Engineering Research reports “Structure and neural mechanisms of catatonia”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Structure and neural mechanisms of catatonia",
        "url": "https://doi.org/10.1016/S2215-0366(18)30474-7",
        "publisher": "The lancet. Psychiatry",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-virginia-tech-neurotechnology",
    "title": "Open letter on intervention regimes and adverse events in focused ultrasound for neuromodulation",
    "companySlug": "virginia-tech-neurotechnology",
    "dateLabel": "Jan 2026",
    "sortDate": "2026-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Virginia Tech reports “Open letter on intervention regimes and adverse events in focused ultrasound for neuromodulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Open letter on intervention regimes and adverse events in focused ultrasound for neuromodulation",
        "url": "https://doi.org/10.1016/j.brs.2025.102994",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-wustl-neurotechnology",
    "title": "Pharmacotherapy and non-invasive neuromodulation for neuropathic pain: a systematic review and meta-analysis",
    "companySlug": "wustl-neurotechnology",
    "dateLabel": "1 May 2025",
    "sortDate": "2025-05-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Washington University Neurotechnology Research reports “Pharmacotherapy and non-invasive neuromodulation for neuropathic pain: a systematic review and meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Pharmacotherapy and non-invasive neuromodulation for neuropathic pain: a systematic review and meta-analysis",
        "url": "https://doi.org/10.1016/S1474-4422(25)00068-7",
        "publisher": "The Lancet. Neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-winnmed-neurotechnology",
    "title": "Stereo-encephalography-guided multi-lead deep brain stimulation for treatment-refractory obsessive compulsive disorder – study design and individualized surgical targeting approach",
    "companySlug": "winnmed-neurotechnology",
    "dateLabel": "21 Apr 2025",
    "sortDate": "2025-04-21",
    "evidenceLevel": "E2",
    "summary": "A preprint with author affiliation to WinnMed reports “Stereo-encephalography-guided multi-lead deep brain stimulation for treatment-refractory obsessive compulsive disorder – study design and individualized surgical targeting approach”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Stereo-encephalography-guided multi-lead deep brain stimulation for treatment-refractory obsessive compulsive disorder – study design and individualized surgical targeting approach",
        "url": "https://doi.org/10.1101/2025.04.17.25325961",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-paper-wvu-rni-lifu",
    "title": "Physiologically informed neuromodulation",
    "companySlug": "wvu-rni-lifu",
    "dateLabel": "28 Dec 2021",
    "sortDate": "2021-12-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to WVU Rockefeller Neuroscience Institute LIFU reports “Physiologically informed neuromodulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Physiologically informed neuromodulation",
        "url": "https://doi.org/10.1016/j.jns.2021.120121",
        "publisher": "Journal of the neurological sciences",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];

export const usEvidenceTrials: Trial[] = [
  {
    "id": "us-trial-advanced-bionics-nct06894303",
    "title": "Evaluation of Remote Programming of Cochlear Implants in Routine Cochlear Implant Follow-up",
    "companySlug": "advanced-bionics",
    "status": "recruiting",
    "condition": "Cochlear Hearing Loss",
    "targetFunction": "Hearing restoration through implanted auditory neural interfaces",
    "deviceProduct": "Target CI v1.5 remote programming",
    "locations": [
      "Groupement Hospitalier Pitié Salpêtrière, Paris, France"
    ],
    "endpoints": [
      "50% SRT measured as signal to noise ratio in DB (French Matrix test in noise)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06894303 study record",
        "url": "https://clinicaltrials.gov/study/NCT06894303",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-alto-neuroscience-nct07553637",
    "title": "ALTO-207 in Adults With Treatment-resistant Depression (TRD)",
    "companySlug": "alto-neuroscience",
    "status": "recruiting",
    "condition": "Treatment-resistant Depression (TRD)",
    "targetFunction": "Patient stratification and treatment-response prediction in psychiatry",
    "deviceProduct": "ALTO-207; Placebo",
    "locations": [
      "Site 7074, Birmingham, Alabama, United States",
      "Site 7173, Dothan, Alabama, United States",
      "Site 7000, Phoenix, Arizona, United States",
      "Site 7153, Chino, California, United States",
      "Site 7156, Oakland, California, United States",
      "Site 7082, Oceanside, California, United States",
      "Site 7159, Palo Alto, California, United States",
      "Site 7016, Sacramento, California, United States"
    ],
    "endpoints": [
      "Change in the MADRS total score"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07553637 study record",
        "url": "https://clinicaltrials.gov/study/NCT07553637",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-altoida-nct05153941",
    "title": "Diagnosis and Monitoring of Disease Progression Using Deep Neuro Signatures",
    "companySlug": "altoida",
    "status": "active not recruiting",
    "condition": "Alzheimer's Disease; Mild Cognitive Impairment",
    "targetFunction": "Cognitive assessment and neurodegenerative monitoring",
    "deviceProduct": "Digital cognitive biomarkers and multimodal NeuroMarker software",
    "locations": [
      "Nikaia Ag Panteleimon Hospital, Athens, Greece"
    ],
    "endpoints": [
      "ADL using selected RMTs",
      "Neuropsychological assessment like the Clinical Dementia Rating (CDR) scale",
      "Neuropsychological assessment like Altoida, Inc. Neuro Motor Index (NMI) medical device",
      "Demographics, medical history, physical status, life-habits, and medication from the analysis of neuropsychological assessments.",
      "Demographics, medical history, physical status, life-habits, and medication from the analysis of biomarker measurements.",
      "Demographics, medical history, physical status, life-habits, and medication from the analysis of RMTs"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05153941 study record",
        "url": "https://clinicaltrials.gov/study/NCT05153941",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-apollo-neuro-nct04381182",
    "title": "Heart Rate Variability and Stress Management Enhancement",
    "companySlug": "apollo-neuro",
    "status": "terminated",
    "condition": "Stress; Heart Rate Variability",
    "targetFunction": "Stress resilience, focus, sleep support, and wellness neurotechnology",
    "deviceProduct": "Apollo Wearable Device",
    "locations": [
      "UPMC Presbyterian Hospital Department of Neurological Surgery, Pittsburgh, Pennsylvania, United States"
    ],
    "endpoints": [
      "Change from baseline to two month heart rate variability",
      "Change from baseline to two month Perceived Stress Scale",
      "Change from baseline to two month Quick Inventory of Depressive Symptomatology (QIDS)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04381182 study record",
        "url": "https://clinicaltrials.gov/study/NCT04381182",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-attune-neurosciences-nct07558148",
    "title": "OCD LIFU Target Engagement",
    "companySlug": "attune-neurosciences",
    "status": "recruiting",
    "condition": "Obsessive Compulsive Disorder (OCD)",
    "targetFunction": "Deep-brain neuromodulation for chronic pain, depression, sleep, addiction, and future closed-loop human-performance research",
    "deviceProduct": "Low Intensity Focused Ultrasound",
    "locations": [
      "University of Pennsylvania, Philadelphia, Pennsylvania, United States"
    ],
    "endpoints": [
      "Change in Symptom Intensity through VAS score",
      "Changes in Imaging between Pre- and Post-Intervention",
      "Incidence of Adverse Events Assesed by Symptom Checklist"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07558148 study record",
        "url": "https://clinicaltrials.gov/study/NCT07558148",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-axoft-nct06673264",
    "title": "First-In-human Trial of a NovEl Soft and Stretchable Neural probE",
    "companySlug": "axoft",
    "status": "completed",
    "condition": "Feasibility of Safe Insertion and Neural Recording With a Soft Neural Probe; Brain Surgery",
    "targetFunction": "Long-term high-density neural communication for future BCI and therapeutic applications",
    "deviceProduct": "Soft Neural Probe",
    "locations": [
      "Centro de Vacunación e Investigación SA (CEVAXIN) - The Panama Clinic, Panama City, Panama"
    ],
    "endpoints": [
      "Feasibility assessed by adverse events"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06673264 study record",
        "url": "https://clinicaltrials.gov/study/NCT06673264",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-axonics-nct06511141",
    "title": "Sacral Neuromodulation for Male Overactive Bladder (MOAB)",
    "companySlug": "axonics",
    "status": "recruiting",
    "condition": "Overactive Bladder; Urinary Urgency Incontinence; Benign Prostatic Hyperplasia; Prostate Cancer",
    "targetFunction": "Bladder and bowel dysfunction treatment through peripheral-nerve stimulation",
    "deviceProduct": "Axonics SNM System",
    "locations": [
      "University of Alabama at Birmingham, Birmingham, Alabama, United States",
      "Urology Associates, Fairhope, Alabama, United States",
      "Mayo Clinic, Scottsdale, Arizona, United States",
      "El Camino Health, Mountain View, California, United States",
      "Tri Valley Urology, Murrieta, California, United States",
      "University of Miami, Miami, Florida, United States",
      "Advanced Urology Institute, Oxford, Florida, United States",
      "Louisiana State University, New Orleans, Louisiana, United States"
    ],
    "endpoints": [
      "Adverse event reporting (Safety)",
      "Performance/Effectiveness - Reduction in UUI or UF episodes"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06511141 study record",
        "url": "https://clinicaltrials.gov/study/NCT06511141",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-beacon-biosignals-nct07110376",
    "title": "Deep Brain Stimulation Neural Recordings of Varied Stimulation During Sleep in Parkinson's Disease",
    "companySlug": "beacon-biosignals",
    "status": "recruiting",
    "condition": "Parkinson Disease",
    "targetFunction": "Precision neuroscience clinical-trial endpoints and EEG biomarker analytics",
    "deviceProduct": "Nighttime Deep Brain Stimulation with Varying Amplitude Settings",
    "locations": [
      "Cleveland Clinic, Cleveland, Ohio, United States"
    ],
    "endpoints": [
      "To demonstrate differences in sleep efficiency (SE) among different stimulation settings."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07110376 study record",
        "url": "https://clinicaltrials.gov/study/NCT07110376",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-bioness-nct03913689",
    "title": "StimRouter Registry Clinical Protocol",
    "companySlug": "bioness",
    "status": "completed",
    "condition": "Chronic Pain; Peripheral Neuropathy; Nervous System Diseases; Peripheral Nervous System Diseases",
    "targetFunction": "Bioness develops implantable and external neurostimulation devices for the rehabilitation of patients with neurological conditions such as stroke, multiple sclerosis, and traumatic brain injury. Their StimRouter peripheral nerve stimulator and NESS L300 foot drop system help patients restore functional movement and manage chronic pain.",
    "deviceProduct": "StimRouter Neuromodulation System",
    "locations": [
      "University of California San Diego, La Jolla, California, United States",
      "California Orthopedics & Spine, Larkspur, California, United States",
      "Stanford University, Redwood City, California, United States",
      "Stamford Hospital, Stamford, Connecticut, United States",
      "International Spine,Pain and Performance Center, Washington D.C., District of Columbia, United States",
      "Warner Orthopedics, Baton Rouge, Louisiana, United States",
      "Albert Einstein/Moss Rehab, Elkins Park, Pennsylvania, United States",
      "Valley Sports and Spine Clinic, Blacksburg, Virginia, United States"
    ],
    "endpoints": [
      "Change in Pain from Screening through 6 Months"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT03913689 study record",
        "url": "https://clinicaltrials.gov/study/NCT03913689",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-blackrock-neurotech-nct07521930",
    "title": "Interfacing With NeuroTechnology to Expand Neural Throughput (INTENT)",
    "companySlug": "blackrock-neurotech",
    "status": "recruiting",
    "condition": "Tetraplegia/Tetraparesis; Amyotrophic Lateral Sclerosis (ALS); Muscular Disorders, Atrophic; Brain Stem Stroke",
    "targetFunction": "Cursor, device, prosthetic, and communication control for paralysis and motor disorders",
    "deviceProduct": "INTENT Neural Interface System",
    "locations": [
      "Johns Hopkins Medicine, Baltimore, Maryland, United States"
    ],
    "endpoints": [
      "Incidence of Device-Related Adverse Events [Safety and Tolerability]"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07521930 study record",
        "url": "https://clinicaltrials.gov/study/NCT07521930",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-braincheck-nct05497427",
    "title": "Normative Database and Test-Retest Reliability for BrainCheck Assessments",
    "companySlug": "braincheck",
    "status": "completed",
    "condition": "Cognitive Change; Cognitive Decline; Cognitive Deterioration; Neurocognitive Deficit",
    "targetFunction": "Rapid cognitive screening, monitoring, and diagnostic support",
    "deviceProduct": "BrainCheck Assessment",
    "locations": [
      "BrainCheck, Palo Alto, California, United States",
      "Maplewood Senior Living, Multiple Locations, Connecticut, United States",
      "BrainCheck, Austin, Texas, United States",
      "BrainCheck, Houston, Texas, United States",
      "BrainCheck, Seattle, Washington, United States"
    ],
    "endpoints": [
      "Mean, standard deviation, and percentiles of values of BrainCheck Assessments"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05497427 study record",
        "url": "https://clinicaltrials.gov/study/NCT05497427",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-brainscope-nct04279431",
    "title": "Follow-up of MTBI Patients Discharged from the ED Using Standard Clinical Triage Including BrainScope One",
    "companySlug": "brainscope",
    "status": "active not recruiting",
    "condition": "TBI (Traumatic Brain Injury); Concussion, Brain; MTBI - Mild Traumatic Brain Injury; Closed Head Injury",
    "targetFunction": "Concussion and traumatic-brain-injury assessment support",
    "deviceProduct": "EEG Recording; Neurocognitive Tests; Clinician Evaluation; 22-item CSI",
    "locations": [
      "Wayne State University - Detroit Receiving Hospital, Detroit, Michigan, United States",
      "Henry Ford Health System, Detroit, Michigan, United States",
      "Wayne State University - Sinai Grace Hospital, Detroit, Michigan, United States",
      "Beaumont Hospital, Royal Oak, Michigan, United States",
      "Beaumont Hospital, Troy, Michigan, United States",
      "Washington University - Barnes Jewish Hospital, St Louis, Missouri, United States",
      "El Paso Medical Center, El Paso, Texas, United States"
    ],
    "endpoints": [
      "Clinical utility of integration of BSC SIC into the triage of closed head injured patients."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04279431 study record",
        "url": "https://clinicaltrials.gov/study/NCT04279431",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-cadence-neuroscience-nct06424977",
    "title": "Biomarker Targeted Stimulation for Epileptiform Events",
    "companySlug": "cadence-neuroscience",
    "status": "not yet recruiting",
    "condition": "Epilepsy",
    "targetFunction": "Epilepsy detection and responsive therapy development",
    "deviceProduct": "Biomarker Targeted Stimulation (BTS)",
    "locations": [
      "No locations listed in the cached registry fields"
    ],
    "endpoints": [
      "Adverse event rate"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06424977 study record",
        "url": "https://clinicaltrials.gov/study/NCT06424977",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-cala-health-nct03778060",
    "title": "Long-Term Transcutaneous Stimulation and Essential Tremor: A PET Study",
    "companySlug": "cala-health",
    "status": "active not recruiting",
    "condition": "Essential Tremor",
    "targetFunction": "Essential tremor and Parkinsonian tremor neuromodulation",
    "deviceProduct": "Cala TWO stimulator",
    "locations": [
      "Mayo Clinic in Rochester, Rochester, Minnesota, United States"
    ],
    "endpoints": [
      "Essential Tremor Assessment Following Transcutaneous Stimulation",
      "Assessment of Daily Activities Following Transcutaneous Stimulation",
      "Assessment of Tremor Severity Following Transcutaneous Stimulation"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT03778060 study record",
        "url": "https://clinicaltrials.gov/study/NCT03778060",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-ceribell-nct07485244",
    "title": "EEG Abnormalities in Adult ICU Patients With High Risk of Delirium",
    "companySlug": "ceribell",
    "status": "recruiting",
    "condition": "Delirium in the Intensive Care Unit",
    "targetFunction": "Point-of-care seizure detection and epilepsy monitoring",
    "deviceProduct": "Ceribell EEG System",
    "locations": [
      "Vanderbilt University Medical Center, Nashville, Tennessee, United States"
    ],
    "endpoints": [
      "Prevalence of EEG Abnormalities on the Ceribell EEG System"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07485244 study record",
        "url": "https://clinicaltrials.gov/study/NCT07485244",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-cionic-nct07284823",
    "title": "Safety and Usability of the Cionic Neural Sleeve for Parkinson's Disease",
    "companySlug": "cionic",
    "status": "recruiting",
    "condition": "Parkinson Disease (PD)",
    "targetFunction": "Mobility assistance and neurorehabilitation for neurological movement disorders",
    "deviceProduct": "Cionic Neural Sleeve Multistim System",
    "locations": [
      "Adapt Movement, Carlsbad, California, United States",
      "CIONIC, San Francisco, California, United States"
    ],
    "endpoints": [
      "Number of Participants Able to Independently Exit a Stimulation Program Using the Cionic Neural Sleeve",
      "Number of Participants Able to Independently Test Stimulation Using the Cionic Neural Sleeve",
      "Number of Participants Able to Independently Calibrate the Cionic Neural Sleeve System",
      "Safety of the Cionic Neural Sleeve"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07284823 study record",
        "url": "https://clinicaltrials.gov/study/NCT07284823",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-coapt-nct04272489",
    "title": "Pattern Recognition Prosthetic Control",
    "companySlug": "coapt",
    "status": "completed",
    "condition": "Prosthesis User; Congenital Amputation of Upper Limb; Amputation; Traumatic, Limb",
    "targetFunction": "Advanced upper-limb prosthetic control and rehabilitation interfaces",
    "deviceProduct": "EMG-Pattern Recognition Controller",
    "locations": [
      "Coapt, LLC, Chicago, Illinois, United States"
    ],
    "endpoints": [
      "Differences in prosthetic wear time"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04272489 study record",
        "url": "https://clinicaltrials.gov/study/NCT04272489",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-cognision-nct04928703",
    "title": "Effects of Ketamine on ERP/EEG Measures in Healthy Volunteers",
    "companySlug": "cognision",
    "status": "completed",
    "condition": "Healthy",
    "targetFunction": "Dementia and cognitive-impairment assessment support",
    "deviceProduct": "Ketamine",
    "locations": [
      "Hassman Research Institute, Marlton, New Jersey, United States"
    ],
    "endpoints": [
      "Ketamine-induced changes in Amplitude for parameters from the ERP tests."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04928703 study record",
        "url": "https://clinicaltrials.gov/study/NCT04928703",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-cognito-therapeutics-nct05637801",
    "title": "A Pivotal Study of Sensory Stimulation in Alzheimer's Disease (HOPE Study)",
    "companySlug": "cognito-therapeutics",
    "status": "active not recruiting",
    "condition": "Alzheimer Disease; Alzheimer Disease 1; Alzheimer Disease 2; Alzheimer Disease 3",
    "targetFunction": "Alzheimer's and cognitive-impairment neuromodulation therapy development",
    "deviceProduct": "Spectris™ AD - Active; Spectris™ AD - Sham",
    "locations": [
      "CCT Research - Gilbert Neurology Partners, Gilbert, Arizona, United States",
      "Barrow Neurological Institute, Phoenix, Arizona, United States",
      "CCT Research - Foothills Research Center, Phoenix, Arizona, United States",
      "Banner Sun Health Research Institute, Sun City, Arizona, United States",
      "Advanced Research Center, Inc, Anaheim, California, United States",
      "ATP Clinical Research, Inc., Costa Mesa, California, United States",
      "Neurology Center of North Orange County, Fullerton, California, United States",
      "Syrentis Clinical Research, Santa Ana, California, United States"
    ],
    "endpoints": [
      "Integrated Alzheimer's Disease MMSE ADCS-ADL Rating Scale (iADMARS)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05637801 study record",
        "url": "https://clinicaltrials.gov/study/NCT05637801",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-cognivue-nct05712005",
    "title": "Cognitive Testing in Diverse Populations to Further the Objective and Clinical Understanding of Cognivue Study",
    "companySlug": "cognivue",
    "status": "completed",
    "condition": "Cognitive Change",
    "targetFunction": "Objective cognitive screening and neuropsychological assessment",
    "deviceProduct": "Computerized cognitive-assessment platform",
    "locations": [
      "Velocity Clinical Research, Durham, North Carolina, United States"
    ],
    "endpoints": [
      "Confirmation of scoring and normative ranges."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05712005 study record",
        "url": "https://clinicaltrials.gov/study/NCT05712005",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-cognixion-nct06810219",
    "title": "Augmented Reality BCI Longitudinal Study for Persons With Late Stage ALS",
    "companySlug": "cognixion",
    "status": "recruiting",
    "condition": "ALS (Amyotrophic Lateral Sclerosis)",
    "targetFunction": "Communication and computer access for people with complex disabilities",
    "deviceProduct": "Cognixion ONE",
    "locations": [
      "Cognixion, Santa Barbara, California, United States"
    ],
    "endpoints": [
      "System Usability Score",
      "Information Transfer Rate (ITR)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06810219 study record",
        "url": "https://clinicaltrials.gov/study/NCT06810219",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-ekso-bionics-nct07030322",
    "title": "Health and Financial Impact on the Use of a Personal Exoskeleton in the Home and Community: a Case Study",
    "companySlug": "ekso-bionics",
    "status": "enrolling by invitation",
    "condition": "Spinal Cord Injury",
    "targetFunction": "Gait rehabilitation and mobility assistance",
    "deviceProduct": "Overground Robotic Exoskeleton",
    "locations": [
      "Ekso Bionics, Inc., San Rafael, California, United States"
    ],
    "endpoints": [
      "Change in sessions recorded and provided by the exoskeleton device across study timepoints",
      "Change in time spent walking recorded and provided by the exoskeleton device across study timepoints",
      "Change in walking time recorded and provided by the exoskeleton device across study timepoints",
      "Change in usage metrics as reported by user",
      "Change in medical health status, assessed by interview and written questions based on the SCI Model Systems form II, between all timepoints in study",
      "Change in bladder function between 5 timepoints using the Modified International SCI Lower Urinary Tract Function Basic Data set"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07030322 study record",
        "url": "https://clinicaltrials.gov/study/NCT07030322",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-emotiv-nct07173439",
    "title": "Multi-center, Single Blinded, RCT, Pivotal Study to Evaluate the Efficacy and Safety of DTx to Improve ADHD",
    "companySlug": "emotiv",
    "status": "completed",
    "condition": "ADHD - Attention Deficit Disorder With Hyperactivity; ADHD - Combined Type; ADHD",
    "targetFunction": "Research EEG, product/user research, cognitive metrics, developer BCI apps, and non-invasive human-computer interaction",
    "deviceProduct": "Model Name: EMT-SR01;red; Model Name: EMT-SR01;red (Placebo)",
    "locations": [
      "Emotiv, Seoul, gangnam, South Korea"
    ],
    "endpoints": [
      "Change from baseline in ADHD-RS (Investigator-Rated Scale) at end of treatment (FAS)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07173439 study record",
        "url": "https://clinicaltrials.gov/study/NCT07173439",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-eneura-edb82-nct02357381",
    "title": "eNeura SpringTMS Post-Market Observational US Study of Migraine",
    "companySlug": "eneura-edb82",
    "status": "completed",
    "condition": "Headache",
    "targetFunction": "Pain/migraine technology for patients",
    "deviceProduct": "eNeura SpringTMS",
    "locations": [
      "Mayo Clinic, Phoenix, Arizona, United States",
      "UCLA Headache Research and Treatment Program, Los Angeles, California, United States",
      "Stanford Headache Program, Stanford, California, United States",
      "Mid Atlantic Permanente Medical Group-Kaiser, Rockville, Maryland, United States",
      "Albert Einstein College of Medicine, The Bronx, New York, United States",
      "The Cleveland Clinic Center for Headache and Pain, Cleveland, Ohio, United States",
      "Jefferson Headache Center, Philadelphia, Pennsylvania, United States"
    ],
    "endpoints": [
      "Headache Days"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT02357381 study record",
        "url": "https://clinicaltrials.gov/study/NCT02357381",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-enspire-dbs-therapy-nct05701280",
    "title": "Pilot/Pivotal Study of DBS+Rehab After Stroke",
    "companySlug": "enspire-dbs-therapy",
    "status": "recruiting",
    "condition": "Stroke; Upper Extremity Paresis",
    "targetFunction": "Deep-brain-stimulation research for post-stroke recovery",
    "deviceProduct": "Deep Brain Stimulation; Rehabilitation",
    "locations": [
      "Barrow Neurological Institute (BNI), Phoenix, Arizona, United States",
      "Mayo Clinic Florida, Jacksonville, Florida, United States",
      "Johns Hopkins School of Medicine, Baltimore, Maryland, United States",
      "Massachusetts General Hospital, Boston, Massachusetts, United States",
      "Mayo Clinic, Rochester, Minnesota, United States",
      "NYU Langone Health, New York, New York, United States",
      "Cleveland Clinic, Cleveland, Ohio, United States",
      "Thomas Jefferson University, Philadelphia, Pennsylvania, United States"
    ],
    "endpoints": [
      "Fugl-Meyer Assessment, Upper Extremity sub-scale (FMA-UE)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05701280 study record",
        "url": "https://clinicaltrials.gov/study/NCT05701280",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-epitel-nct06027749",
    "title": "Impact of Capturing Ictal Events With Ultra-long-term Ambulatory EEG Monitoring With Remote EEG Monitoring System.",
    "companySlug": "epitel",
    "status": "recruiting",
    "condition": "Epilepsy; Seizures",
    "targetFunction": "Long-term seizure detection and epilepsy research",
    "deviceProduct": "Epitel's™ Remote EEG Monitoring System's (REMI™)",
    "locations": [
      "University of South Florida, Tampa, Florida, United States",
      "Medical University of South Carolina, Charleston, South Carolina, United States"
    ],
    "endpoints": [
      "Ictal Events Identified in fourteen (14) days."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06027749 study record",
        "url": "https://clinicaltrials.gov/study/NCT06027749",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-fisher-wallace-labs-nct07288008",
    "title": "Transcranial Alternating Current Stimulation (tACS) for the Treatment of Anxiety in Veterans: An Open-Label Pilot Study",
    "companySlug": "fisher-wallace-labs",
    "status": "recruiting",
    "condition": "Anxiety",
    "targetFunction": "Non-invasive mood and sleep neuromodulation",
    "deviceProduct": "Transcranial alternating current stimulator",
    "locations": [
      "Birmingham VA, Birmingham, Alabama, United States"
    ],
    "endpoints": [
      "Generalized Anxiety Disorder 7-item (GAD-7)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07288008 study record",
        "url": "https://clinicaltrials.gov/study/NCT07288008",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-inner-cosmos-nct05393622",
    "title": "Brain Stimulation for Severe Depression",
    "companySlug": "inner-cosmos",
    "status": "recruiting",
    "condition": "Depression Severe",
    "targetFunction": "Mood-disorder neuromodulation research",
    "deviceProduct": "INTRACALVARIAL PREFRONTAL CORTICAL STIMULATION (IpCS) IN SEVERE TREATMENT-RESISTANT DEPRESSION",
    "locations": [
      "Massachusetts General Hospital, Boston, Massachusetts, United States",
      "Washington University in St Louis School of Medicine, St Louis, Missouri, United States"
    ],
    "endpoints": [
      "Change in depression symptoms"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05393622 study record",
        "url": "https://clinicaltrials.gov/study/NCT05393622",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-inspire-medical-systems-nct07113288",
    "title": "Inspire UAS High Apnea Hypopnea Index (AHI)/High Body Mass Index (BMI) Post-Approval Study",
    "companySlug": "inspire-medical-systems",
    "status": "recruiting",
    "condition": "Obstructive Sleep Apnea (OSA)",
    "targetFunction": "Sleep-apnea therapy through peripheral-nerve stimulation",
    "deviceProduct": "Inspire® UAS System",
    "locations": [
      "Colorado ENT & Allergy, Colorado Springs, Colorado, United States",
      "Florida Sleep Specialists, Bradenton, Florida, United States",
      "Rush University Medical Center, Chicago, Illinois, United States",
      "University of Kansas Medical Center, Kansas City, Kansas, United States",
      "University of Rochester, Rochester, New York, United States"
    ],
    "endpoints": [
      "Incidence of Procedure and/or Device Related Adverse Events (Safety and Tolerability)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07113288 study record",
        "url": "https://clinicaltrials.gov/study/NCT07113288",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-medtronic-neuromodulation-nct02773082",
    "title": "DBS for Obsessive-Compulsive Disorder",
    "companySlug": "medtronic-neuromodulation",
    "status": "recruiting",
    "condition": "Obsessive-Compulsive Disorder (OCD)",
    "targetFunction": "Neurological and chronic-pain treatment through implanted neuromodulation",
    "deviceProduct": "Reclaim™ DBS Therapy",
    "locations": [
      "Zucker Hillside Hospital, Queens, New York, United States"
    ],
    "endpoints": [
      "Efficacy as indicated by a decrease in obsessive compulsive symptoms as assessed by the Yale-Brown Obsessive Compulsive Scale (Y-BOCS)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT02773082 study record",
        "url": "https://clinicaltrials.gov/study/NCT02773082",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-microtransponder-nct05301140",
    "title": "Vivistim Registry for Paired VNS Therapy (GRASP)",
    "companySlug": "microtransponder",
    "status": "recruiting",
    "condition": "Upper Extremity Problem",
    "targetFunction": "Upper-limb recovery after stroke through targeted neuromodulation",
    "deviceProduct": "Vivistim System",
    "locations": [
      "Advent Health Orlando, Orlando, Florida, United States",
      "Alexian Brothers Health System, Elk Grove Village, Illinois, United States",
      "Endeavor Health, Evanston, Illinois, United States",
      "University of Kansas Medical Center, Kansas City, Kansas, United States",
      "University of Kentucky Research Foundation, Lexington, Kentucky, United States",
      "Overlook Medical Center-Atlantic Health, Morristown, New Jersey, United States",
      "Albany Medical College, Albany, New York, United States",
      "Mt. Sinai, New York, New York, United States"
    ],
    "endpoints": [
      "Fugl Meyer Assessment (FM-A)",
      "Wolf Motor Function Test (WMFT)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05301140 study record",
        "url": "https://clinicaltrials.gov/study/NCT05301140",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-motif-neurotech-nct07684794",
    "title": "Regulated Stimulation for Optimized Network Activity and Therapeutic Equilibrium - Maintenance",
    "companySlug": "motif-neurotech",
    "status": "not yet recruiting",
    "condition": "Major Depressive Disorder (MDD)",
    "targetFunction": "Targeted psychiatric neuromodulation research",
    "deviceProduct": "Motif XCS System",
    "locations": [
      "No locations listed in the cached registry fields"
    ],
    "endpoints": [
      "Incidence of device and/or procedure-related adverse events (AEs)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07684794 study record",
        "url": "https://clinicaltrials.gov/study/NCT07684794",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-myomo-nct05575674",
    "title": "Retrospective Study on Myoelectric Elbow-Wrist-Hand Orthosis User Outcomes",
    "companySlug": "myomo",
    "status": "completed",
    "condition": "Stroke; Brachial Plexus Injury; Spinal Cord Injuries; Neurological Disease",
    "targetFunction": "Restoring arm and hand movement after stroke, SCI, and neurological injury",
    "deviceProduct": "Myoelectric Elbow-Wrist-Hand Orthosis",
    "locations": [
      "Myomo, Inc., Boston, Massachusetts, United States",
      "Geauga Rehabilitation Engineering, Inc., Chardon, Ohio, United States",
      "Orthocare Innovations, LLC, Edmonds, Washington, United States"
    ],
    "endpoints": [
      "Disabilities of the Arm, Shoulder and Hand (DASH)",
      "Disabilities of the Arm, Shoulder and Hand (DASH)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05575674 study record",
        "url": "https://clinicaltrials.gov/study/NCT05575674",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-nalu-medical-nct05870124",
    "title": "Clinical Study of a Micro-Implantable Pulse Generator for the Treatment of Peripheral Neuropathic Pain (COMFORT 2)",
    "companySlug": "nalu-medical",
    "status": "active not recruiting",
    "condition": "Peripheral Neuralgia; Peripheral Neuropathy; Chronic Pain",
    "targetFunction": "Chronic-pain neuromodulation",
    "deviceProduct": "Nalu Neurostimulation System for PNS; Conventional Medical Management",
    "locations": [
      "The Pain Institute of Southern Arizona, Tucson, Arizona, United States",
      "Comprehensive Spine & Pain Physicians, Burbank, California, United States",
      "Pain Management and Injury Relief, Thousand Oaks, California, United States",
      "DBPS Research LLC, Denver, Colorado, United States",
      "International Spine, Pain & Performance Center, Washington D.C., District of Columbia, United States",
      "Coastal Spine & Pain Center, Jacksonville, Florida, United States",
      "University of Kansas Health System, Bell Hospital Marc A. Asher Comprehensive Spine Center, Kansas City, Kansas, United States",
      "Insight Research Institute, Flint, Michigan, United States"
    ],
    "endpoints": [
      "Effectiveness: Responder Rates between the 2 groups",
      "Safety: Rate of serious and non-serious device effects"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05870124 study record",
        "url": "https://clinicaltrials.gov/study/NCT05870124",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-neosensory-nct06508060",
    "title": "Bimodal Stimulation Using Auditory and Vibrotactile Stimuli for the Mitigation of Tinnitus",
    "companySlug": "neosensory",
    "status": "unknown",
    "condition": "Tinnitus",
    "targetFunction": "Accessible sensory augmentation and hearing-support research",
    "deviceProduct": "Neosensory Wristband; Tones only",
    "locations": [
      "No locations listed in the cached registry fields"
    ],
    "endpoints": [
      "Tinnitus Functional Index"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06508060 study record",
        "url": "https://clinicaltrials.gov/study/NCT06508060",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-neuraptive-nct06616025",
    "title": "This Study Will Evaluate the Effectiveness of NTX-001, a Surgical Nerve Repair Product When Used in People With Upper Extremity Nerve Lacerations.",
    "companySlug": "neuraptive",
    "status": "recruiting",
    "condition": "Peripheral Nerve Injury Upper Limb; Peripheral Nerve Injury (PNI)",
    "targetFunction": "Peripheral nerve repair and restoration of motor function",
    "deviceProduct": "NTX-001 (PEG-Fusion)",
    "locations": [
      "Cedars Sinai Medical Center, Los Angeles, California, United States",
      "Rothman Orthopedics - Advent Health, Orlando, Florida, United States",
      "Orlando Health Orlando Regional Medical Center, Orlando, Florida, United States",
      "Grady Health, Atlanta, Georgia, United States",
      "University of Chicago, Chicago, Illinois, United States",
      "University of Louisville, Louisville, Kentucky, United States",
      "Louisiana State University Health Sciences Center, New Orleans, Louisiana, United States",
      "Curtis National Center at MedStar Union Memorial Hospital, Baltimore, Maryland, United States"
    ],
    "endpoints": [
      "Mean Michigan Hand Questionnaire (MHQ) Two Domain Score (ADL and Pain)",
      "Safety - Columbia-Suicide Severity Rating Scale"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06616025 study record",
        "url": "https://clinicaltrials.gov/study/NCT06616025",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-neurokinetics-nct03844282",
    "title": "Research Evaluating Sports ConcUssion Events - Rapid Assessment of Concussion and Evidence for Return",
    "companySlug": "neurokinetics",
    "status": "completed",
    "condition": "Concussion, Brain; Motor Vehicle Accident",
    "targetFunction": "Objective neurological and vestibular assessment",
    "deviceProduct": "Clinical assessment (SCAT5); ImPACT; CANTAB; I-PAS/Dx100; Saliva sample",
    "locations": [
      "Mr Stephen Kelleher, Cambridge, Cambridgeshire, United Kingdom"
    ],
    "endpoints": [
      "Change in SCAT5 decision scores",
      "Change in computerised neurocognitive assessment scores",
      "Change in computerised neuropsychological assessment scores",
      "Change in the brain's microstructural architecture, or functional changes in the brain",
      "Change in salivary biomarker levels"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT03844282 study record",
        "url": "https://clinicaltrials.gov/study/NCT03844282",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-neurometrix-nct05540002",
    "title": "Efficacy of the Quell Wearable Device for Chronic Overlapping Pain Conditions",
    "companySlug": "neurometrix",
    "status": "completed",
    "condition": "Chronic Pain; Adults 21 and Older; Multiple Chronic Overlapping Pain Conditions; Hypersensitivity",
    "targetFunction": "Peripheral-nerve assessment and chronic-condition monitoring",
    "deviceProduct": "High Intensity Quell; Low Intensity Quell",
    "locations": [
      "Brigham and Women's Hospital Pain Management Center, Chestnut Hill, Massachusetts, United States"
    ],
    "endpoints": [
      "The Brief Pain Inventory Interference Scale (BPI)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05540002 study record",
        "url": "https://clinicaltrials.gov/study/NCT05540002",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-neuronetics-nct06997549",
    "title": "Retrospective Analyses of the Greenbrook Database Evaluating Mental Health Treatments",
    "companySlug": "neuronetics",
    "status": "recruiting",
    "condition": "Depression; OCD; Anxiety Depression",
    "targetFunction": "Clinical non-invasive neuromodulation for depression and mental-health care",
    "deviceProduct": "Patients treated with NeuroStar TMS; Patients treated with Esketamine",
    "locations": [
      "Neuronetics, Malvern, Pennsylvania, United States"
    ],
    "endpoints": [
      "change in clinical outcome scores from baseline to post treatment"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06997549 study record",
        "url": "https://clinicaltrials.gov/study/NCT06997549",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-neuropace-rns-nct05120635",
    "title": "Intracranial Neurophysiological Signatures of Fear and Anxiety in Humans",
    "companySlug": "neuropace-rns",
    "status": "recruiting",
    "condition": "Fear; GAD; Emotional Memory; PTSD",
    "targetFunction": "Seizure reduction and long-term epilepsy brain-network monitoring",
    "deviceProduct": "Deep Brain Stimulation; Virtual and augmented reality tasks",
    "locations": [
      "University of California Los Angeles, Los Angeles, California, United States",
      "Duke University Health System, Durham, North Carolina, United States"
    ],
    "endpoints": [
      "Physiological change - eye-blinks",
      "Physiological change - heart rate variability",
      "Physiological change - skin conductance",
      "Neurophysiological activity"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05120635 study record",
        "url": "https://clinicaltrials.gov/study/NCT05120635",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-neurosigma-nct01388530",
    "title": "Trigeminal Nerve Stimulation for Attention Deficit Hyperactivity Disorder (ADHD)",
    "companySlug": "neurosigma",
    "status": "completed",
    "condition": "Attention-Deficit/Hyperactivity Disorder",
    "targetFunction": "Non-invasive neuromodulation for epilepsy and neuropsychiatric research",
    "deviceProduct": "EMS 7500 Digital Muscle Stimulator",
    "locations": [
      "UCLA, Los Angeles, California, United States"
    ],
    "endpoints": [
      "ADHD-IV Rating Scale (ADHD-RS)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT01388530 study record",
        "url": "https://clinicaltrials.gov/study/NCT01388530",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-nevro-nct02650362",
    "title": "STructural And FunCTional Brain Alterations by HIgh FrequenCy Spinal Cord Stimulation",
    "companySlug": "nevro",
    "status": "completed",
    "condition": "Failed Back Surgery Syndrome",
    "targetFunction": "Chronic-pain neuromodulation",
    "deviceProduct": "fMRI",
    "locations": [
      "UZ Brussel, Brussels, Vlaams Brabant, Belgium"
    ],
    "endpoints": [
      "Grey Mater Volume assessed by Voxel-based morphometry analysis (based on MRI images)",
      "Functional connectivity analysis using in-house developed software (based on MRI images)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT02650362 study record",
        "url": "https://clinicaltrials.gov/study/NCT02650362",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-nexalin-technology-nct07659366",
    "title": "HALO Clarity™ Cranial Alternating Current Stimulation Therapy for Adults With Moderate-to-Severe Insomnia",
    "companySlug": "nexalin-technology",
    "status": "not yet recruiting",
    "condition": "Moderate to Severe Insomnia",
    "targetFunction": "Mental-health and neurological neuromodulation research",
    "deviceProduct": "Transcranial alternating current stimulator",
    "locations": [
      "Nexalin Technology, Houston, Texas, United States"
    ],
    "endpoints": [
      "Change in Insomnia Severity Index (ISI) Total Score at Week 4"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07659366 study record",
        "url": "https://clinicaltrials.gov/study/NCT07659366",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-nextsense-nct05114616",
    "title": "Assessment of Consciousness States with NextSense Ear Bud Devices",
    "companySlug": "nextsense",
    "status": "completed",
    "condition": "Sleep",
    "targetFunction": "Ambulatory brain-state and sleep measurement",
    "deviceProduct": "NextSense EEG-enabled earbuds; Ellcie Healthy Glasses",
    "locations": [
      "Emory Sleep Center, Atlanta, Georgia, United States"
    ],
    "endpoints": [
      "30-second Epoch Related to Wake Stage of Sleep",
      "30-second Epoch Related to N1 Stage of Sleep",
      "30-second Epoch Related to N2 Stage of Sleep",
      "30-second Epoch Related to N3 Stage of Sleep",
      "30-second Epoch Related to Rapid Eye Movement (REM) Stage of Sleep",
      "30-second Epoch Related to Movement Time"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05114616 study record",
        "url": "https://clinicaltrials.gov/study/NCT05114616",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-nico-corporation-nct05756985",
    "title": "Improving Understanding of Glioblastoma Through Preservation of Biologically Active Brain Tissue",
    "companySlug": "nico-corporation",
    "status": "recruiting",
    "condition": "Glioblastoma; Glioblastoma Multiforme; Gliosarcoma",
    "targetFunction": "Neurosurgical procedure support and neural-interface enabling access",
    "deviceProduct": "Specimen Collection",
    "locations": [
      "Miami Cancer Institute at Baptist Health, Inc., Miami, Florida, United States"
    ],
    "endpoints": [
      "Number of glioblastoma (GBM) samples for analysis"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05756985 study record",
        "url": "https://clinicaltrials.gov/study/NCT05756985",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-openbci-nct06782360",
    "title": "Cognitive Augmentation Via Multimodal Sensing and Auricular Neurostimulation",
    "companySlug": "openbci",
    "status": "completed",
    "condition": "Healthy; Cognitive Change; Effects of External Neurostimulation on Cognition",
    "targetFunction": "Developer and research infrastructure for non-invasive BCI and neurotechnology",
    "deviceProduct": "Active Neurostimulation; Sham Stimulation",
    "locations": [
      "OpenBCI, Brooklyn, New York, United States"
    ],
    "endpoints": [
      "Flanker Task Performance",
      "GradCPT Task Performance",
      "MATB Task Performance",
      "Cybersickness Task Performance"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06782360 study record",
        "url": "https://clinicaltrials.gov/study/NCT06782360",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-otolith-labs-nct06540235",
    "title": "The Effect of Bone-Conducted Stimulation on Rotary Chair Time Constants in Patients With Vestibular Migraines",
    "companySlug": "otolith-labs",
    "status": "completed",
    "condition": "Vestibular Migraine",
    "targetFunction": "Non-invasive vestibular resonance stimulation in a head-worn investigational device for chronic vertigo",
    "deviceProduct": "Otolith Device Active; Otolith Device Inactive",
    "locations": [
      "Dizzy and Vertigo Institute of Los Angeles, Beverly Hills, California, United States",
      "Medical University of South Carolina, Charleston, South Carolina, United States"
    ],
    "endpoints": [
      "Reduction of time constant"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06540235 study record",
        "url": "https://clinicaltrials.gov/study/NCT06540235",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-photopharmics-nct04453033",
    "title": "DB RCT for Specialized Phototherapy in Parkinson's Disease.",
    "companySlug": "photopharmics",
    "status": "active not recruiting",
    "condition": "Parkinson Disease",
    "targetFunction": "Photopharmics develops the Celeste light therapy device, a precisely calibrated intrinsically photosensitive retinal ganglion cell (ipRGC) stimulator designed to treat Parkinson&#x27;s disease non-motor symptoms.",
    "deviceProduct": "Celeste Specialized Phototherapy Device",
    "locations": [
      "University of Rochester, Rochester, New York, United States"
    ],
    "endpoints": [
      "Parkinson's Disease Questionnaire-39 (PDQ-39)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04453033 study record",
        "url": "https://clinicaltrials.gov/study/NCT04453033",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-respicardia-nct03884660",
    "title": "remedē System Therapy Study",
    "companySlug": "respicardia",
    "status": "active not recruiting",
    "condition": "Central Sleep Apnea",
    "targetFunction": "Central sleep-apnea treatment through peripheral-nerve stimulation",
    "deviceProduct": "remede System",
    "locations": [
      "Banner University Medical Center, Phoenix, Arizona, United States",
      "Arizona Heart Rhythm Center, Phoenix, Arizona, United States",
      "HonorHealth, Scottsdale, Arizona, United States",
      "The University of California San Francisco, San Francisco, California, United States",
      "University of Colorado- Anschutz, Aurora, Colorado, United States",
      "University of Colorado Health, Fort Collins, Colorado, United States",
      "Central Florida Pulmonary Group, Orlando, Florida, United States",
      "Emory University Midtown Hospital, Atlanta, Georgia, United States"
    ],
    "endpoints": [
      "Evaluate safety of the remedē System at implant and protocol required follow up by assessment of serious adverse events (SAEs) related to procedure, device, or delivered therapy",
      "Evaluate changes in sleep disordered breathing metrics after 12 months of therapy"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT03884660 study record",
        "url": "https://clinicaltrials.gov/study/NCT03884660",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-rewalk-robotics-nct01251549",
    "title": "Safety and Performance Evaluation of ReWalk Reciprocating Gait Orthosis (RGO)",
    "companySlug": "rewalk-robotics",
    "status": "completed",
    "condition": "Paraplegia; Spinal Cord Injuries (SCI)",
    "targetFunction": "Mobility assistance for spinal cord injury and stroke rehabilitation",
    "deviceProduct": "ReWalk - a motorized exoskeleton suit",
    "locations": [
      "Albert Einstein Medical Center, Moss Rehabilitation Center, Elkins Park, Pennsylvania, United States",
      "Ospedale Valduce di Como, Centro Villa Beretta Italy, Como, Italy"
    ],
    "endpoints": [
      "Safety of use"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT01251549 study record",
        "url": "https://clinicaltrials.gov/study/NCT01251549",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-rune-labs-nct05065151",
    "title": "Understanding Motivation in Parkinson's Patients Through Neurophysiology",
    "companySlug": "rune-labs",
    "status": "recruiting",
    "condition": "Parkinson Disease; Deep Brain Stimulation; Motivation",
    "targetFunction": "Measurement and optimization of neurological care, including Parkinson's disease",
    "deviceProduct": "Stimulation on; Stimulation off; Decision Making Task",
    "locations": [
      "University of California San Francisco, San Francisco, California, United States"
    ],
    "endpoints": [
      "Percent of Risky Decisions made with Percept DBS stimulation on for Parkinson's Disease Patients",
      "Percent of Risky Decisions made with Percept DBS stimulation off for Parkinson's Disease Patients",
      "Reaction Time During Decision-Making Task",
      "Task Success Rate",
      "Acceptance Rate of Risky Versus Safe Options",
      "Force Exertion During Motor Responses"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05065151 study record",
        "url": "https://clinicaltrials.gov/study/NCT05065151",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-soterix-medical-nct07318480",
    "title": "Transcranial Direct Current Stimulation (tDCS) for Treatment of Cocaine Use Disorder",
    "companySlug": "soterix-medical",
    "status": "recruiting",
    "condition": "Cocaine Use Disorder; Cocaine Dependence; Substance Use Disorder (SUD)",
    "targetFunction": "Non-invasive brain stimulation and BCI-enabling research infrastructure",
    "deviceProduct": "Transcranial Direct Current Stimulator (tDCS); Cognitive Reappraisal Training",
    "locations": [
      "Icahn School of Medicine at Mount Sinai, New York, New York, United States"
    ],
    "endpoints": [
      "fMRI blood-oxygenation level dependent (BOLD) signal",
      "Change in Self-Reported Craving Score"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07318480 study record",
        "url": "https://clinicaltrials.gov/study/NCT07318480",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-spr-therapeutics-nct07166952",
    "title": "Peripheral Nerve Stimulation With the SPRINT® System in Chronic PSIJC Pain",
    "companySlug": "spr-therapeutics",
    "status": "recruiting",
    "condition": "Lower Back Pain",
    "targetFunction": "Acute and chronic pain treatment through neuromodulation",
    "deviceProduct": "SPRINT PNS System",
    "locations": [
      "Medical University of South Carolina, Charleston, South Carolina, United States",
      "Medical University of South Carolina, Charleston, South Carolina, United States"
    ],
    "endpoints": [
      "Numeric Rating Scale at 60 days and 90 days post procedure (lead removal)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07166952 study record",
        "url": "https://clinicaltrials.gov/study/NCT07166952",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-trial-viz-ai-nct04608617",
    "title": "SYNCHRONISE: LVO Triage Timing and Outcome Study",
    "companySlug": "viz-ai",
    "status": "completed",
    "condition": "Stroke, Ischemic",
    "targetFunction": "Stroke and neurological-emergency imaging workflows",
    "deviceProduct": "Viz LVO (De Novo Number DEN170073); Baseline Effectiveness Cohort",
    "locations": [
      "Wellstar Neurosurgery, Atlanta, Georgia, United States",
      "Semmes-Murphey, Memphis, Tennessee, United States",
      "Valley Baptist Medical Center, Harlingen, Texas, United States"
    ],
    "endpoints": [
      "Transfer patients: Time from spoke CT/CTA to door-out",
      "Non-transfer patients: Time from Hub door to groin puncture"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04608617 study record",
        "url": "https://clinicaltrials.gov/study/NCT04608617",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];

export const usEvidenceMilestones: Milestone[] = [
  {
    "id": "us-milestone-alto-neuroscience-nct07553637-start",
    "title": "Alto Neuroscience study opens",
    "companySlug": "alto-neuroscience",
    "dateLabel": "May 2026 (estimated)",
    "sortDate": "2026-05-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists May 2026 (estimated) as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07553637 study record",
        "url": "https://clinicaltrials.gov/study/NCT07553637",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-alto-neuroscience-nct07553637-completion",
    "title": "Alto Neuroscience study completion window listed",
    "companySlug": "alto-neuroscience",
    "dateLabel": "Dec 2027 (estimated)",
    "sortDate": "2027-12-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Dec 2027 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07553637 study record",
        "url": "https://clinicaltrials.gov/study/NCT07553637",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-axonics-nct06511141-start",
    "title": "Axonics study opens",
    "companySlug": "axonics",
    "dateLabel": "22 Oct 2024",
    "sortDate": "2024-10-22",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 22 Oct 2024 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06511141 study record",
        "url": "https://clinicaltrials.gov/study/NCT06511141",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-axonics-nct06511141-completion",
    "title": "Axonics study completion window listed",
    "companySlug": "axonics",
    "dateLabel": "Dec 2028 (estimated)",
    "sortDate": "2028-12-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Dec 2028 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06511141 study record",
        "url": "https://clinicaltrials.gov/study/NCT06511141",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-bioness-nct03913689-start",
    "title": "Bioness study opens",
    "companySlug": "bioness",
    "dateLabel": "26 Jun 2019",
    "sortDate": "2019-06-26",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 26 Jun 2019 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT03913689 study record",
        "url": "https://clinicaltrials.gov/study/NCT03913689",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-cadence-neuroscience-nct06424977-start",
    "title": "Cadence Neuroscience study is scheduled to open",
    "companySlug": "cadence-neuroscience",
    "dateLabel": "1 Sept 2026 (estimated)",
    "sortDate": "2026-09-01",
    "status": "upcoming",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 1 Sept 2026 (estimated) as the study start and currently marks the study not yet recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06424977 study record",
        "url": "https://clinicaltrials.gov/study/NCT06424977",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-cadence-neuroscience-nct06424977-completion",
    "title": "Cadence Neuroscience study completion window listed",
    "companySlug": "cadence-neuroscience",
    "dateLabel": "14 Feb 2030 (estimated)",
    "sortDate": "2030-02-14",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 14 Feb 2030 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06424977 study record",
        "url": "https://clinicaltrials.gov/study/NCT06424977",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-coapt-nct04272489-start",
    "title": "Coapt study opens",
    "companySlug": "coapt",
    "dateLabel": "17 Dec 2020",
    "sortDate": "2020-12-17",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 17 Dec 2020 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT04272489 study record",
        "url": "https://clinicaltrials.gov/study/NCT04272489",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-cognivue-nct05712005-start",
    "title": "Cognivue study opens",
    "companySlug": "cognivue",
    "dateLabel": "8 Sept 2022",
    "sortDate": "2022-09-08",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 8 Sept 2022 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05712005 study record",
        "url": "https://clinicaltrials.gov/study/NCT05712005",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-ekso-bionics-nct07030322-start",
    "title": "Ekso Bionics study opens",
    "companySlug": "ekso-bionics",
    "dateLabel": "4 Aug 2025",
    "sortDate": "2025-08-04",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 4 Aug 2025 as the study start and currently marks the study enrolling by invitation.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07030322 study record",
        "url": "https://clinicaltrials.gov/study/NCT07030322",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-ekso-bionics-nct07030322-completion",
    "title": "Ekso Bionics study completion window listed",
    "companySlug": "ekso-bionics",
    "dateLabel": "Sept 2027 (estimated)",
    "sortDate": "2027-09-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Sept 2027 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07030322 study record",
        "url": "https://clinicaltrials.gov/study/NCT07030322",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-eneura-edb82-nct02357381-start",
    "title": "eNeura study opens",
    "companySlug": "eneura-edb82",
    "dateLabel": "1 Dec 2014",
    "sortDate": "2014-12-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 1 Dec 2014 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT02357381 study record",
        "url": "https://clinicaltrials.gov/study/NCT02357381",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-enspire-dbs-therapy-nct05701280-start",
    "title": "Enspire DBS Therapy study opens",
    "companySlug": "enspire-dbs-therapy",
    "dateLabel": "3 Feb 2023",
    "sortDate": "2023-02-03",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 3 Feb 2023 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05701280 study record",
        "url": "https://clinicaltrials.gov/study/NCT05701280",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-enspire-dbs-therapy-nct05701280-completion",
    "title": "Enspire DBS Therapy study completion window listed",
    "companySlug": "enspire-dbs-therapy",
    "dateLabel": "Jun 2030 (estimated)",
    "sortDate": "2030-06-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Jun 2030 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT05701280 study record",
        "url": "https://clinicaltrials.gov/study/NCT05701280",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-inspire-medical-systems-nct07113288-start",
    "title": "Inspire Medical Systems study opens",
    "companySlug": "inspire-medical-systems",
    "dateLabel": "31 Jul 2025",
    "sortDate": "2025-07-31",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 31 Jul 2025 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07113288 study record",
        "url": "https://clinicaltrials.gov/study/NCT07113288",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-inspire-medical-systems-nct07113288-completion",
    "title": "Inspire Medical Systems study completion window listed",
    "companySlug": "inspire-medical-systems",
    "dateLabel": "1 Jan 2032 (estimated)",
    "sortDate": "2032-01-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 1 Jan 2032 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07113288 study record",
        "url": "https://clinicaltrials.gov/study/NCT07113288",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-microtransponder-nct05301140-start",
    "title": "MicroTransponder study opens",
    "companySlug": "microtransponder",
    "dateLabel": "15 Mar 2023",
    "sortDate": "2023-03-15",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 15 Mar 2023 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05301140 study record",
        "url": "https://clinicaltrials.gov/study/NCT05301140",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-microtransponder-nct05301140-completion",
    "title": "MicroTransponder study completion window listed",
    "companySlug": "microtransponder",
    "dateLabel": "31 Dec 2028 (estimated)",
    "sortDate": "2028-12-31",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 31 Dec 2028 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT05301140 study record",
        "url": "https://clinicaltrials.gov/study/NCT05301140",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-myomo-nct05575674-start",
    "title": "Myomo study opens",
    "companySlug": "myomo",
    "dateLabel": "5 Oct 2022",
    "sortDate": "2022-10-05",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 5 Oct 2022 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05575674 study record",
        "url": "https://clinicaltrials.gov/study/NCT05575674",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-neosensory-nct06508060-start",
    "title": "Neosensory study opens",
    "companySlug": "neosensory",
    "dateLabel": "Aug 2024 (estimated)",
    "sortDate": "2024-08-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Aug 2024 (estimated) as the study start and currently marks the study unknown.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06508060 study record",
        "url": "https://clinicaltrials.gov/study/NCT06508060",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-neuraptive-nct06616025-start",
    "title": "Neuraptive Therapeutics study opens",
    "companySlug": "neuraptive",
    "dateLabel": "10 Feb 2025",
    "sortDate": "2025-02-10",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 10 Feb 2025 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06616025 study record",
        "url": "https://clinicaltrials.gov/study/NCT06616025",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-neuraptive-nct06616025-completion",
    "title": "Neuraptive Therapeutics study completion window listed",
    "companySlug": "neuraptive",
    "dateLabel": "30 Apr 2027 (estimated)",
    "sortDate": "2027-04-30",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 30 Apr 2027 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06616025 study record",
        "url": "https://clinicaltrials.gov/study/NCT06616025",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-nexalin-technology-nct07659366-completion",
    "title": "Nexalin Technology study completion window listed",
    "companySlug": "nexalin-technology",
    "dateLabel": "25 Oct 2027 (estimated)",
    "sortDate": "2027-10-25",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 25 Oct 2027 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07659366 study record",
        "url": "https://clinicaltrials.gov/study/NCT07659366",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-otolith-labs-nct06540235-start",
    "title": "Otolith Labs study opens",
    "companySlug": "otolith-labs",
    "dateLabel": "27 Aug 2024",
    "sortDate": "2024-08-27",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 27 Aug 2024 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06540235 study record",
        "url": "https://clinicaltrials.gov/study/NCT06540235",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-photopharmics-nct04453033-start",
    "title": "Photopharmics study opens",
    "companySlug": "photopharmics",
    "dateLabel": "26 Feb 2024",
    "sortDate": "2024-02-26",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 26 Feb 2024 as the study start and currently marks the study active not recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT04453033 study record",
        "url": "https://clinicaltrials.gov/study/NCT04453033",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-photopharmics-nct04453033-completion",
    "title": "Photopharmics study completion window listed",
    "companySlug": "photopharmics",
    "dateLabel": "30 Aug 2026 (estimated)",
    "sortDate": "2026-08-30",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 30 Aug 2026 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT04453033 study record",
        "url": "https://clinicaltrials.gov/study/NCT04453033",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-respicardia-nct03884660-start",
    "title": "Respicardia study opens",
    "companySlug": "respicardia",
    "dateLabel": "18 Jun 2019",
    "sortDate": "2019-06-18",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 18 Jun 2019 as the study start and currently marks the study active not recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT03884660 study record",
        "url": "https://clinicaltrials.gov/study/NCT03884660",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-respicardia-nct03884660-completion",
    "title": "Respicardia study completion window listed",
    "companySlug": "respicardia",
    "dateLabel": "30 Dec 2030 (estimated)",
    "sortDate": "2030-12-30",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 30 Dec 2030 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT03884660 study record",
        "url": "https://clinicaltrials.gov/study/NCT03884660",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-rewalk-robotics-nct01251549-start",
    "title": "ReWalk Robotics study opens",
    "companySlug": "rewalk-robotics",
    "dateLabel": "Mar 2009",
    "sortDate": "2009-03-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Mar 2009 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT01251549 study record",
        "url": "https://clinicaltrials.gov/study/NCT01251549",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-milestone-viz-ai-nct04608617-start",
    "title": "Viz.ai study opens",
    "companySlug": "viz-ai",
    "dateLabel": "9 Mar 2021",
    "sortDate": "2021-03-09",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 9 Mar 2021 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT04608617 study record",
        "url": "https://clinicaltrials.gov/study/NCT04608617",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];

export const usEvidenceProjects: ProgramProject[] = [
  {
    "id": "us-project-alpha-stim",
    "companySlug": "alpha-stim",
    "name": "Alpha-Stim tracked neurotechnology program",
    "focus": "Non-invasive stimulation for anxiety, insomnia, and pain-management indications",
    "modality": "Cranial electrotherapy stimulation and microcurrent devices",
    "statusLabel": "Commercial non-invasive stimulation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Alpha-Stim is retained as a source-backed U.S. neurotechnology program focused on non-invasive stimulation for anxiety, insomnia, and pain-management indications using cranial electrotherapy stimulation and microcurrent devices.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Alpha-Stim official technology / product information",
        "url": "https://alpha-stim.com/",
        "publisher": "Alpha-Stim",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-ampa-health",
    "companySlug": "ampa-health",
    "name": "Ampa Health tracked neurotechnology program",
    "focus": "Expanded-access TMS workflows for mental-health care",
    "modality": "Portable transcranial magnetic stimulation",
    "statusLabel": "FDA-cleared TMS access model listed by NeuroFounders",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Ampa Health is retained as a source-backed U.S. neurotechnology program focused on expanded-access tms workflows for mental-health care using portable transcranial magnetic stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Ampa Health official technology / product information",
        "url": "https://www.ampahealth.com/",
        "publisher": "Ampa Health",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-aora",
    "companySlug": "aora",
    "name": "Aora tracked neurotechnology program",
    "focus": "Cognitive load, neural recovery, burnout risk, and brain-state tracking",
    "modality": "Behind-the-ear multimodal neurofeedback wearable",
    "statusLabel": "Early non-medical consumer neurotech company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Aora is retained as a source-backed U.S. neurotechnology program focused on cognitive load, neural recovery, burnout risk, and brain-state tracking using behind-the-ear multimodal neurofeedback wearable.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Aora official technology / product information",
        "url": "https://aoramind.com",
        "publisher": "Aora",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-arctop",
    "companySlug": "arctop",
    "name": "Arctop tracked neurotechnology program",
    "focus": "Real-time cognitive and intention metrics from neural activity",
    "modality": "Hardware-agnostic neural decoding APIs and cognitive-state software",
    "statusLabel": "Research/developer software platform",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Arctop is retained as a source-backed U.S. neurotechnology program focused on real-time cognitive and intention metrics from neural activity using hardware-agnostic neural decoding apis and cognitive-state software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Arctop official technology / product information",
        "url": "https://arctop.com/",
        "publisher": "Arctop",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-atlas-wearable",
    "companySlug": "atlas-wearable",
    "name": "Atlas tracked neurotechnology program",
    "focus": "Readiness, focus, and cognitive-signal monitoring in real-world settings",
    "modality": "Behind-the-ear EEG wearable",
    "statusLabel": "Early consumer neurotech wearable",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Atlas is retained as a source-backed U.S. neurotechnology program focused on readiness, focus, and cognitive-signal monitoring in real-world settings using behind-the-ear eeg wearable.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Atlas official technology / product information",
        "url": "https://www.atlaswearable.com",
        "publisher": "Atlas",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-atom-limbs",
    "companySlug": "atom-limbs",
    "name": "Atom Limbs tracked neurotechnology program",
    "focus": "Affordable upper-limb prosthetic control",
    "modality": "EMG-controlled bionic arm platform",
    "statusLabel": "Early assistive-interface company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Atom Limbs is retained as a source-backed U.S. neurotechnology program focused on affordable upper-limb prosthetic control using emg-controlled bionic arm platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Atom Limbs official technology / product information",
        "url": "https://atomlimbs.com/",
        "publisher": "Atom Limbs",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-augmental",
    "companySlug": "augmental",
    "name": "Augmental tracked neurotechnology program",
    "focus": "In-mouth tongue interface for hands-free digital control",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Augmental is retained as a source-backed U.S. neurotechnology program focused on in-mouth tongue interface for hands-free digital control using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Augmental official website",
        "url": "https://www.augmental.tech/",
        "publisher": "Augmental",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-awear",
    "companySlug": "awear",
    "name": "AWEAR tracked neurotechnology program",
    "focus": "Brainwave tracking, stress insights, and emotional-wellness monitoring",
    "modality": "Ear-worn EEG wearable and AI wellness software",
    "statusLabel": "Non-medical consumer EEG wearable",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "AWEAR is retained as a source-backed U.S. neurotechnology program focused on brainwave tracking, stress insights, and emotional-wellness monitoring using ear-worn eeg wearable and ai wellness software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "AWEAR official technology / product information",
        "url": "https://aweartech.com",
        "publisher": "AWEAR",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-axiobionics",
    "companySlug": "axiobionics",
    "name": "Axiobionics tracked neurotechnology program",
    "focus": "Restoring movement and function after spinal cord injury and stroke",
    "modality": "Functional electrical stimulation and rehabilitation systems",
    "statusLabel": "Commercial neurorehabilitation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Axiobionics is retained as a source-backed U.S. neurotechnology program focused on restoring movement and function after spinal cord injury and stroke using functional electrical stimulation and rehabilitation systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Axiobionics official technology / product information",
        "url": "https://axiobionics.com/",
        "publisher": "Axiobionics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-bico-formerly-cellink-neuracle-neuroscience",
    "companySlug": "bico-formerly-cellink-neuracle-neuroscience",
    "name": "BICO (formerly Cellink) / Neuracle Neuroscience tracked neurotechnology program",
    "focus": "Neuracle Neuroscience develops clinical-grade wireless EEG monitoring systems for long-term ambulatory brain monitoring in epilepsy diagnosis, ICU care, and neurological disease management. Their NeuroCap disposable pre-gelled EEG cap dramatically reduces setup time and infection risk compared to traditional EEG electrode placement in clinical settings.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BICO (formerly Cellink) / Neuracle Neuroscience is retained as a source-backed U.S. neurotechnology program focused on neuracle neuroscience develops clinical-grade wireless eeg monitoring systems for long-term ambulatory brain monitoring in epilepsy diagnosis, icu care, and neurological disease management. their neurocap disposable pre-gelled eeg cap dramatically reduces setup time and infection risk compared to traditional eeg electrode placement in clinical settings. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BICO (formerly Cellink) / Neuracle Neuroscience official website",
        "url": "https://neuracletech.com",
        "publisher": "BICO (formerly Cellink) / Neuracle Neuroscience",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-biological-input-output-systems",
    "companySlug": "biological-input-output-systems",
    "name": "Biological Input Output Systems tracked neurotechnology program",
    "focus": "Movement and sensation restoration through nervous-system input/output interfaces",
    "modality": "Implantable peripheral neural interface for bidirectional device communication",
    "statusLabel": "Investigational implantable universal neural-interface company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Biological Input Output Systems is retained as a source-backed U.S. neurotechnology program focused on movement and sensation restoration through nervous-system input/output interfaces using implantable peripheral neural interface for bidirectional device communication.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Biological Input Output Systems official technology / product information",
        "url": "https://www.biologicinputoutputsystems.com/",
        "publisher": "Biological Input Output Systems",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-bionaut-labs",
    "companySlug": "bionaut-labs",
    "name": "Bionaut Labs tracked neurotechnology program",
    "focus": "Targeted treatment delivery in the brain; not a BCI",
    "modality": "Remotely navigated microscale medical robots for CNS drug delivery",
    "statusLabel": "Clinical-stage neurotherapeutics platform company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Bionaut Labs is retained as a source-backed U.S. neurotechnology program focused on targeted treatment delivery in the brain; not a bci using remotely navigated microscale medical robots for cns drug delivery.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Bionaut Labs official technology / product information",
        "url": "https://bionautlabs.com/",
        "publisher": "Bionaut Labs",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-bioventus-neurology",
    "companySlug": "bioventus-neurology",
    "name": "Bioventus Neurology tracked neurotechnology program",
    "focus": "Bioventus Neurology offers non-invasive ultrasound-based neuromodulation platforms targeting musculoskeletal pain pathways and peripheral nerve conditions through focused therapeutic ultrasound.",
    "modality": "Implantable or peripheral neuromodulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Bioventus Neurology is retained as a source-backed U.S. neurotechnology program focused on bioventus neurology offers non-invasive ultrasound-based neuromodulation platforms targeting musculoskeletal pain pathways and peripheral nerve conditions through focused therapeutic ultrasound. using implantable or peripheral neuromodulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Bioventus Neurology official website",
        "url": "https://www.bioventus.com",
        "publisher": "Bioventus Neurology",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-brainbit",
    "companySlug": "brainbit",
    "name": "BrainBit tracked neurotechnology program",
    "focus": "Neurofeedback, brain-state monitoring, and biosignal app development",
    "modality": "Wearable dry-electrode EEG, EMG, ECG devices and SDKs",
    "statusLabel": "Commercial non-medical biosensing hardware and SDK company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BrainBit is retained as a source-backed U.S. neurotechnology program focused on neurofeedback, brain-state monitoring, and biosignal app development using wearable dry-electrode eeg, emg, ecg devices and sdks.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BrainBit official technology / product information",
        "url": "https://brainbit.com",
        "publisher": "BrainBit",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-brainkey",
    "companySlug": "brainkey",
    "name": "BrainKey tracked neurotechnology program",
    "focus": "Consumer-facing MRI interpretation, brain-age visualization, and lifestyle insights",
    "modality": "MRI visualization and brain-health insight software",
    "statusLabel": "Non-medical neuroimaging software company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BrainKey is retained as a source-backed U.S. neurotechnology program focused on consumer-facing mri interpretation, brain-age visualization, and lifestyle insights using mri visualization and brain-health insight software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BrainKey official technology / product information",
        "url": "https://www.brainkey.ai",
        "publisher": "BrainKey",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-cadwell",
    "companySlug": "cadwell",
    "name": "Cadwell tracked neurotechnology program",
    "focus": "Cadwell manufactures clinical neurophysiology equipment including EEG, EMG, evoked potentials, and intraoperative neuromonitoring systems for hospitals and research institutions worldwide.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cadwell is retained as a source-backed U.S. neurotechnology program focused on cadwell manufactures clinical neurophysiology equipment including eeg, emg, evoked potentials, and intraoperative neuromonitoring systems for hospitals and research institutions worldwide. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cadwell official website",
        "url": "https://cadwell.com",
        "publisher": "Cadwell",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-cahira-technologies",
    "companySlug": "cahira-technologies",
    "name": "Cahira Technologies tracked neurotechnology program",
    "focus": "Early-stage BCI and neuromodulation interface development",
    "modality": "Minimally invasive neural-interface technology",
    "statusLabel": "Preclinical company profile with limited public technical detail",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cahira Technologies is retained as a source-backed U.S. neurotechnology program focused on early-stage bci and neuromodulation interface development using minimally invasive neural-interface technology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cahira Technologies official technology / product information",
        "url": "https://www.linkedin.com/company/cahiratech/",
        "publisher": "Cahira Technologies",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-cerevia-neurosciences",
    "companySlug": "cerevia-neurosciences",
    "name": "Cerevia Neurosciences tracked neurotechnology program",
    "focus": "Dementia and cognitive-impairment neuromodulation research",
    "modality": "Transcranial magnetic stimulation for cognitive impairment",
    "statusLabel": "Preclinical non-invasive neuromodulation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cerevia Neurosciences is retained as a source-backed U.S. neurotechnology program focused on dementia and cognitive-impairment neuromodulation research using transcranial magnetic stimulation for cognitive impairment.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cerevia Neurosciences official technology / product information",
        "url": "https://cerevia.care",
        "publisher": "Cerevia Neurosciences",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-cgx-cognionics",
    "companySlug": "cgx-cognionics",
    "name": "CGX / Cognionics tracked neurotechnology program",
    "focus": "Dry EEG research, real-world neuroimaging, human factors, affective science, sleep monitoring, and BCI-enabling data acquisition",
    "modality": "Wireless dry EEG headsets, active dry electrodes, gel EEG options, and mobile neuroimaging systems",
    "statusLabel": "Commercial dry EEG research hardware platform",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "CGX / Cognionics is retained as a source-backed U.S. neurotechnology program focused on dry eeg research, real-world neuroimaging, human factors, affective science, sleep monitoring, and bci-enabling data acquisition using wireless dry eeg headsets, active dry electrodes, gel eeg options, and mobile neuroimaging systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "CGX home page",
        "url": "https://www.cgxsystems.com/",
        "publisher": "CGX",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-clarity-technologies",
    "companySlug": "clarity-technologies",
    "name": "Clarity Technologies tracked neurotechnology program",
    "focus": "Non-invasive neuromodulation for dementia and cognitive impairment",
    "modality": "Light/sound neuromodulation platform",
    "statusLabel": "Investigational light/sound neuromodulation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Clarity Technologies is retained as a source-backed U.S. neurotechnology program focused on non-invasive neuromodulation for dementia and cognitive impairment using light/sound neuromodulation platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Clarity Technologies official technology / product information",
        "url": "https://www.clarity-technologies.com/",
        "publisher": "Clarity Technologies",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-cognionics",
    "companySlug": "cognionics",
    "name": "Cognionics tracked neurotechnology program",
    "focus": "Ambulatory brain-signal recording for research and BCI development",
    "modality": "Dry-electrode mobile EEG systems",
    "statusLabel": "Commercial wearable EEG company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cognionics is retained as a source-backed U.S. neurotechnology program focused on ambulatory brain-signal recording for research and bci development using dry-electrode mobile eeg systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cognionics official technology / product information",
        "url": "https://cognionics.com/",
        "publisher": "Cognionics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-cognixion-one",
    "companySlug": "cognixion-one",
    "name": "Cognixion ONE tracked neurotechnology program",
    "focus": "Assistive communication and control for people with complex disabilities, plus researcher-facing Axon-R workflows",
    "modality": "Non-invasive EEG integrated with augmented reality, AI, and steady-state visual evoked potential classification",
    "statusLabel": "FDA Breakthrough Device Designation for Cognixion ONE Axon; Axon-R listed for research use only",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cognixion ONE is retained as a source-backed U.S. neurotechnology program focused on assistive communication and control for people with complex disabilities, plus researcher-facing axon-r workflows using non-invasive eeg integrated with augmented reality, ai, and steady-state visual evoked potential classification.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cognixion home page",
        "url": "https://www.cognixion.com/",
        "publisher": "Cognixion",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-cogwear",
    "companySlug": "cogwear",
    "name": "Cogwear tracked neurotechnology program",
    "focus": "Research-grade real-world EEG monitoring and cognitive-state tracking",
    "modality": "Wearable EEG and cognitive-state analytics",
    "statusLabel": "Research-only wearable EEG infrastructure company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cogwear is retained as a source-backed U.S. neurotechnology program focused on research-grade real-world eeg monitoring and cognitive-state tracking using wearable eeg and cognitive-state analytics.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cogwear official technology / product information",
        "url": "https://www.cogweartech.com/",
        "publisher": "Cogwear",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-decervo",
    "companySlug": "decervo",
    "name": "deCervo tracked neurotechnology program",
    "focus": "deCervo applies neuroscience and machine learning to measure and improve cognitive performance, with applications in sports performance assessment and concussion evaluation.",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "deCervo is retained as a source-backed U.S. neurotechnology program focused on decervo applies neuroscience and machine learning to measure and improve cognitive performance, with applications in sports performance assessment and concussion evaluation. using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "deCervo official website",
        "url": "https://decervo.com",
        "publisher": "deCervo",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-eeg-info",
    "companySlug": "eeg-info",
    "name": "EEG Info tracked neurotechnology program",
    "focus": "EEG Info, led by neurofeedback pioneer Siegfried Othmer, provides neurofeedback training systems, clinician education, and clinical protocols for treating ADHD, anxiety, PTSD, and brain injury. Their Othmer Method is among the most widely trained neurofeedback approaches globally.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "EEG Info is retained as a source-backed U.S. neurotechnology program focused on eeg info, led by neurofeedback pioneer siegfried othmer, provides neurofeedback training systems, clinician education, and clinical protocols for treating adhd, anxiety, ptsd, and brain injury. their othmer method is among the most widely trained neurofeedback approaches globally. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "EEG Info official website",
        "url": "https://eeginfo.com",
        "publisher": "EEG Info",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-envoy-medical",
    "companySlug": "envoy-medical",
    "name": "Envoy Medical tracked neurotechnology program",
    "focus": "Hearing restoration for people with severe sensorineural hearing loss",
    "modality": "Implantable hearing neuroprosthesis and auditory-interface systems",
    "statusLabel": "Clinical and commercial hearing-implant company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Envoy Medical is retained as a source-backed U.S. neurotechnology program focused on hearing restoration for people with severe sensorineural hearing loss using implantable hearing neuroprosthesis and auditory-interface systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Envoy Medical official technology / product information",
        "url": "https://envoymedical.com/",
        "publisher": "Envoy Medical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-evoke-neuroscience",
    "companySlug": "evoke-neuroscience",
    "name": "Evoke Neuroscience tracked neurotechnology program",
    "focus": "Objective neurophysiology measurement for cognitive and mental-health workflows",
    "modality": "EEG/ERP brain-health assessment and analytics",
    "statusLabel": "Commercial EEG analytics company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Evoke Neuroscience is retained as a source-backed U.S. neurotechnology program focused on objective neurophysiology measurement for cognitive and mental-health workflows using eeg/erp brain-health assessment and analytics.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Evoke Neuroscience official technology / product information",
        "url": "https://evokeneuroscience.com/",
        "publisher": "Evoke Neuroscience",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-forest-neurotech",
    "companySlug": "forest-neurotech",
    "name": "Forest Neurotech tracked neurotechnology program",
    "focus": "Whole-brain read/write research, neural-circuit mapping, and future therapeutic brain-interface applications",
    "modality": "Ultrasound-based whole-brain interface for imaging and neuromodulation",
    "statusLabel": "Nonprofit focused research organization developing Forest 1; early safety work reported, no approved product",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Forest Neurotech is retained as a source-backed U.S. neurotechnology program focused on whole-brain read/write research, neural-circuit mapping, and future therapeutic brain-interface applications using ultrasound-based whole-brain interface for imaging and neuromodulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Forest Neurotech overview",
        "url": "https://forestneurotech.org/",
        "publisher": "Forest Neurotech",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-helius-medical",
    "companySlug": "helius-medical",
    "name": "Helius Medical Technologies tracked neurotechnology program",
    "focus": "Neurorehabilitation support for gait and balance impairment",
    "modality": "Portable neuromodulation stimulator paired with physical therapy",
    "statusLabel": "Commercial neurorehabilitation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Helius Medical Technologies is retained as a source-backed U.S. neurotechnology program focused on neurorehabilitation support for gait and balance impairment using portable neuromodulation stimulator paired with physical therapy.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Helius Medical Technologies official technology / product information",
        "url": "https://heliusmedical.com/",
        "publisher": "Helius Medical Technologies",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-intactis-bio",
    "companySlug": "intactis-bio",
    "name": "Intactis Bio tracked neurotechnology program",
    "focus": "Research technology for developers",
    "modality": "MEA",
    "statusLabel": "Non-medical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Intactis Bio is retained as a source-backed U.S. neurotechnology program focused on research technology for developers using mea.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Intactis Bio official website",
        "url": "https://www.intactis.bio/",
        "publisher": "Intactis Bio",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-intan-technologies",
    "companySlug": "intan-technologies",
    "name": "Intan Technologies tracked neurotechnology program",
    "focus": "Intan Technologies manufactures low-noise, high-channel-count neural recording chips and headstages used by academic and industrial neuroscience researchers globally. Their RHD and RHS series integrated circuits have become a standard in electrophysiology research systems.",
    "modality": "Neural recording or interface infrastructure",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Intan Technologies is retained as a source-backed U.S. neurotechnology program focused on intan technologies manufactures low-noise, high-channel-count neural recording chips and headstages used by academic and industrial neuroscience researchers globally. their rhd and rhs series integrated circuits have become a standard in electrophysiology research systems. using neural recording or interface infrastructure.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Intan Technologies official website",
        "url": "https://intantech.com",
        "publisher": "Intan Technologies",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-intheon",
    "companySlug": "intheon",
    "name": "Intheon tracked neurotechnology program",
    "focus": "Research-grade ambulatory brain and physiology recording",
    "modality": "Wireless EEG and multimodal biosignal acquisition systems",
    "statusLabel": "Commercial neurophysiology technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Intheon is retained as a source-backed U.S. neurotechnology program focused on research-grade ambulatory brain and physiology recording using wireless eeg and multimodal biosignal acquisition systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Intheon official technology / product information",
        "url": "https://intheon.io/",
        "publisher": "Intheon",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-iotamotion",
    "companySlug": "iotamotion",
    "name": "iotaMotion tracked neurotechnology program",
    "focus": "Improving precision and consistency in auditory neural-prosthesis surgery",
    "modality": "Robotic and image-guided cochlear-implant insertion technology",
    "statusLabel": "Clinical-stage surgical neurotechnology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "iotaMotion is retained as a source-backed U.S. neurotechnology program focused on improving precision and consistency in auditory neural-prosthesis surgery using robotic and image-guided cochlear-implant insertion technology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "iotaMotion official technology / product information",
        "url": "https://iotamotion.com/",
        "publisher": "iotaMotion",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-kyma-neuro",
    "companySlug": "kyma-neuro",
    "name": "Kyma Neuro tracked neurotechnology program",
    "focus": "Research technology for developers",
    "modality": "Software",
    "statusLabel": "Non-medical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Kyma Neuro is retained as a source-backed U.S. neurotechnology program focused on research technology for developers using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Kyma Neuro official website",
        "url": "https://www.kymaneuro.com/",
        "publisher": "Kyma Neuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-mobia-medical",
    "companySlug": "mobia-medical",
    "name": "Mobia Medical tracked neurotechnology program",
    "focus": "Stroke technology for patients",
    "modality": "VNS",
    "statusLabel": "FDA approved (PMA); Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Mobia Medical is retained as a source-backed U.S. neurotechnology program focused on stroke technology for patients using vns.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Mobia Medical official website",
        "url": "https://www.mobia.com/",
        "publisher": "Mobia Medical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-mobius-bionics",
    "companySlug": "mobius-bionics",
    "name": "Mobius Bionics tracked neurotechnology program",
    "focus": "Walking and rehabilitation support after neurological injury",
    "modality": "Powered exoskeleton and mobility-assistance systems",
    "statusLabel": "Commercial assistive-mobility company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Mobius Bionics is retained as a source-backed U.S. neurotechnology program focused on walking and rehabilitation support after neurological injury using powered exoskeleton and mobility-assistance systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Mobius Bionics official technology / product information",
        "url": "https://mobiusbionics.com/",
        "publisher": "Mobius Bionics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-myndscape",
    "companySlug": "myndscape",
    "name": "Myndscape tracked neurotechnology program",
    "focus": "Myndscape offers a consumer-grade EEG headband and companion app that delivers personalized neurofeedback training sessions to improve focus, sleep, and stress resilience.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Myndscape is retained as a source-backed U.S. neurotechnology program focused on myndscape offers a consumer-grade eeg headband and companion app that delivers personalized neurofeedback training sessions to improve focus, sleep, and stress resilience. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Myndscape official website",
        "url": "https://myndscape.com",
        "publisher": "Myndscape",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-myneurva",
    "companySlug": "myneurva",
    "name": "myNEURVA tracked neurotechnology program",
    "focus": "myNEURVA provides a clinician-guided neurofeedback platform for cognitive rehabilitation targeting post-concussion syndrome and traumatic brain injury recovery. Their cloud-based system pairs patients with remote neurofeedback therapists.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "myNEURVA is retained as a source-backed U.S. neurotechnology program focused on myneurva provides a clinician-guided neurofeedback platform for cognitive rehabilitation targeting post-concussion syndrome and traumatic brain injury recovery. their cloud-based system pairs patients with remote neurofeedback therapists. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "myNEURVA official website",
        "url": "https://myneurva.com",
        "publisher": "myNEURVA",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-natus-medical",
    "companySlug": "natus-medical",
    "name": "Natus Medical tracked neurotechnology program",
    "focus": "Natus Medical is a leading provider of neurology and newborn care medical devices, offering products for EEG, EMG, evoked potentials, and newborn hearing screening. Their Nicolet and Excel-Tech EEG systems are used in hospitals and neurology clinics across more than 100 countries.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Natus Medical is retained as a source-backed U.S. neurotechnology program focused on natus medical is a leading provider of neurology and newborn care medical devices, offering products for eeg, emg, evoked potentials, and newborn hearing screening. their nicolet and excel-tech eeg systems are used in hospitals and neurology clinics across more than 100 countries. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Natus Medical official website",
        "url": "https://www.natus.com",
        "publisher": "Natus Medical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-neurable-mw75",
    "companySlug": "neurable-mw75",
    "name": "Neurable MW75 Neuro tracked neurotechnology program",
    "focus": "Focus tracking, brain-break prompts, cognitive insights, and everyday non-invasive BCI interface research",
    "modality": "Consumer EEG headphones with dry fabric EEG sensors and AI focus/cognitive-state software",
    "statusLabel": "Commercial EEG headphone platform for wellness/productivity, not a medical BCI",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neurable MW75 Neuro is retained as a source-backed U.S. neurotechnology program focused on focus tracking, brain-break prompts, cognitive insights, and everyday non-invasive bci interface research using consumer eeg headphones with dry fabric eeg sensors and ai focus/cognitive-state software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "MW75 Neuro product page",
        "url": "https://www.neurable.com/products/mw75neuro",
        "publisher": "Neurable",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-neural-analytics",
    "companySlug": "neural-analytics",
    "name": "Neural Analytics tracked neurotechnology program",
    "focus": "Bedside cerebral blood-flow monitoring for stroke and neurocritical care",
    "modality": "Portable transcranial Doppler ultrasound and AI analytics",
    "statusLabel": "Commercial neurodiagnostic company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neural Analytics is retained as a source-backed U.S. neurotechnology program focused on bedside cerebral blood-flow monitoring for stroke and neurocritical care using portable transcranial doppler ultrasound and ai analytics.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neural Analytics official technology / product information",
        "url": "https://neuralanalytics.com/",
        "publisher": "Neural Analytics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-neuro42",
    "companySlug": "neuro42",
    "name": "Neuro42 tracked neurotechnology program",
    "focus": "Accessible brain imaging and neuro-intervention workflows",
    "modality": "Portable MRI and robotic image-guided intervention platform",
    "statusLabel": "Clinical neuroimaging company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neuro42 is retained as a source-backed U.S. neurotechnology program focused on accessible brain imaging and neuro-intervention workflows using portable mri and robotic image-guided intervention platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neuro42 official technology / product information",
        "url": "https://www.neuro42.ai/",
        "publisher": "Neuro42",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-neurofus-sonic-concepts",
    "companySlug": "neurofus-sonic-concepts",
    "name": "NeuroFUS / Sonic Concepts tracked neurotechnology program",
    "focus": "Human and animal TUS/tFUS neuromodulation research, protocol development, and BCI-enabling stimulation studies",
    "modality": "Turnkey low-intensity transcranial focused-ultrasound neuromodulation research system",
    "statusLabel": "Commercial research hardware for neuroscience and medical-device R&D",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroFUS / Sonic Concepts is retained as a source-backed U.S. neurotechnology program focused on human and animal tus/tfus neuromodulation research, protocol development, and bci-enabling stimulation studies using turnkey low-intensity transcranial focused-ultrasound neuromodulation research system.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroFUS home page",
        "url": "https://neurofus.com/",
        "publisher": "NeuroFUS",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-neurolife",
    "companySlug": "neurolife",
    "name": "NeuroLife tracked neurotechnology program",
    "focus": "Rehabilitation technology for patients",
    "modality": "Nerve stimulator",
    "statusLabel": "Investigational; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroLife is retained as a source-backed U.S. neurotechnology program focused on rehabilitation technology for patients using nerve stimulator.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroLife official website",
        "url": "https://www.neurolifetech.com/",
        "publisher": "NeuroLife",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-neuromore",
    "companySlug": "neuromore",
    "name": "neuromore tracked neurotechnology program",
    "focus": "Device-agnostic real-time EEG and biosignal software for neurofeedback and brain-responsive applications",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "neuromore is retained as a source-backed U.S. neurotechnology program focused on device-agnostic real-time eeg and biosignal software for neurofeedback and brain-responsive applications using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "neuromore official website",
        "url": "https://neuromore.com/",
        "publisher": "neuromore",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-neurovigil",
    "companySlug": "neurovigil",
    "name": "NeuroVigil tracked neurotechnology program",
    "focus": "Longitudinal brain-state monitoring and neurological biomarker research",
    "modality": "Single-channel EEG and machine-learning neurophysiology analysis",
    "statusLabel": "Commercial neurophysiology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroVigil is retained as a source-backed U.S. neurotechnology program focused on longitudinal brain-state monitoring and neurological biomarker research using single-channel eeg and machine-learning neurophysiology analysis.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroVigil official technology / product information",
        "url": "https://neurovigil.com/",
        "publisher": "NeuroVigil",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-nurolux",
    "companySlug": "nurolux",
    "name": "NuroLux tracked neurotechnology program",
    "focus": "Functional brain monitoring for concussion and brain-injury assessment",
    "modality": "Wearable diffuse optical neuroimaging",
    "statusLabel": "Clinical neuroimaging company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NuroLux is retained as a source-backed U.S. neurotechnology program focused on functional brain monitoring for concussion and brain-injury assessment using wearable diffuse optical neuroimaging.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NuroLux official technology / product information",
        "url": "https://nurolux.com/",
        "publisher": "NuroLux",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-open-ephys",
    "companySlug": "open-ephys",
    "name": "Open Ephys tracked neurotechnology program",
    "focus": "Open Ephys is a nonprofit organization that develops open-source hardware and software for extracellular electrophysiology research. Their Open Ephys GUI and acquisition board are widely adopted in academic neuroscience labs for high-channel neural recording.",
    "modality": "Neural recording or interface infrastructure",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Open Ephys is retained as a source-backed U.S. neurotechnology program focused on open ephys is a nonprofit organization that develops open-source hardware and software for extracellular electrophysiology research. their open ephys gui and acquisition board are widely adopted in academic neuroscience labs for high-channel neural recording. using neural recording or interface infrastructure.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Open Ephys official website",
        "url": "https://open-ephys.org",
        "publisher": "Open Ephys",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-openbci-galea",
    "companySlug": "openbci-galea",
    "name": "OpenBCI / Galea tracked neurotechnology program",
    "focus": "Developer BCI tools, neurofeedback, biosensing research, XR interaction, accessibility prototyping, and open-source neurotechnology",
    "modality": "Open-source EEG, EMG, ECG, EOG, and multimodal biosensing hardware including Galea for XR research",
    "statusLabel": "Commercial developer/research platform with open-source hardware and Galea mixed-reality biosensing headset",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "OpenBCI / Galea is retained as a source-backed U.S. neurotechnology program focused on developer bci tools, neurofeedback, biosensing research, xr interaction, accessibility prototyping, and open-source neurotechnology using open-source eeg, emg, ecg, eog, and multimodal biosensing hardware including galea for xr research.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "OpenBCI home page",
        "url": "https://openbci.com/",
        "publisher": "OpenBCI",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-parley-neurotech",
    "companySlug": "parley-neurotech",
    "name": "Parley Neurotech tracked neurotechnology program",
    "focus": "Audio stimulation and investigational therapy for central hearing loss",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Parley Neurotech is retained as a source-backed U.S. neurotechnology program focused on audio stimulation and investigational therapy for central hearing loss using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Parley Neurotech official website",
        "url": "https://www.parley-neuro.com/",
        "publisher": "Parley Neurotech",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-persyst",
    "companySlug": "persyst",
    "name": "Persyst tracked neurotechnology program",
    "focus": "Persyst develops AI-powered EEG analysis software that automates spike detection, seizure identification, and quantitative EEG analysis to assist neurologists in reading complex EEG recordings more efficiently. Their Persyst 14 platform integrates with major EEG hardware vendors and is used in clinical and research settings.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Persyst is retained as a source-backed U.S. neurotechnology program focused on persyst develops ai-powered eeg analysis software that automates spike detection, seizure identification, and quantitative eeg analysis to assist neurologists in reading complex eeg recordings more efficiently. their persyst 14 platform integrates with major eeg hardware vendors and is used in clinical and research settings. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Persyst official website",
        "url": "https://www.persyst.com",
        "publisher": "Persyst",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-quantanosis",
    "companySlug": "quantanosis",
    "name": "Quantanosis tracked neurotechnology program",
    "focus": "Stroke technology for patients",
    "modality": "Ultrasound",
    "statusLabel": "Preclinical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Quantanosis is retained as a source-backed U.S. neurotechnology program focused on stroke technology for patients using ultrasound.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Quantanosis official website",
        "url": "https://www.quantanosis.ai/",
        "publisher": "Quantanosis",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-rapidai",
    "companySlug": "rapidai",
    "name": "RapidAI tracked neurotechnology program",
    "focus": "Faster brain-imaging triage and treatment coordination",
    "modality": "AI neuroimaging workflow software for stroke and vascular emergencies",
    "statusLabel": "Commercial clinical neuroimaging company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "RapidAI is retained as a source-backed U.S. neurotechnology program focused on faster brain-imaging triage and treatment coordination using ai neuroimaging workflow software for stroke and vascular emergencies.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "RapidAI official technology / product information",
        "url": "https://www.rapidai.com/",
        "publisher": "RapidAI",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-rhythmlink",
    "companySlug": "rhythmlink",
    "name": "Rhythmlink tracked neurotechnology program",
    "focus": "Electrodes and accessories for EEG and intraoperative neuromonitoring",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Rhythmlink is retained as a source-backed U.S. neurotechnology program focused on electrodes and accessories for eeg and intraoperative neuromonitoring using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Rhythmlink official website",
        "url": "https://rhythmlink.com/",
        "publisher": "Rhythmlink",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-ripple-neuro",
    "companySlug": "ripple-neuro",
    "name": "Ripple Neuro tracked neurotechnology program",
    "focus": "Ripple Neuro develops high-channel-count neural interface systems for intraoperative and chronic recording applications. Their Grapevine neural interface processor is widely used in clinical and research BCIs worldwide.",
    "modality": "Neural recording or interface infrastructure",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Ripple Neuro is retained as a source-backed U.S. neurotechnology program focused on ripple neuro develops high-channel-count neural interface systems for intraoperative and chronic recording applications. their grapevine neural interface processor is widely used in clinical and research bcis worldwide. using neural recording or interface infrastructure.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Ripple Neuro official website",
        "url": "https://rippleneuro.com",
        "publisher": "Ripple Neuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-sonavex",
    "companySlug": "sonavex",
    "name": "Sonavex tracked neurotechnology program",
    "focus": "Point-of-care vascular and tissue imaging; adjacent neuroimaging infrastructure",
    "modality": "Portable ultrasound and AI imaging platform",
    "statusLabel": "Commercial ultrasound-imaging company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Sonavex is retained as a source-backed U.S. neurotechnology program focused on point-of-care vascular and tissue imaging; adjacent neuroimaging infrastructure using portable ultrasound and ai imaging platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Sonavex official technology / product information",
        "url": "https://sonavex.com/",
        "publisher": "Sonavex",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-sond",
    "companySlug": "sond",
    "name": "SOND tracked neurotechnology program",
    "focus": "Sleep technology for consumers",
    "modality": "Others",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "SOND is retained as a source-backed U.S. neurotechnology program focused on sleep technology for consumers using others.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "SOND official website",
        "url": "https://sond.com/",
        "publisher": "SOND",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-sononeu-sonogenetics",
    "companySlug": "sononeu-sonogenetics",
    "name": "SonoNeu tracked neurotechnology program",
    "focus": "Programmable cellular control, drug-free neuromodulation, and longer-term ultrasound interface biology for peripheral and central nervous system disorders",
    "modality": "Sonogenetics platform pairing engineered ultrasound-sensitive proteins with focused ultrasound delivery",
    "statusLabel": "Stealth exit with ARPA-H-supported preclinical sonogenetics translation program",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "SonoNeu is retained as a source-backed U.S. neurotechnology program focused on programmable cellular control, drug-free neuromodulation, and longer-term ultrasound interface biology for peripheral and central nervous system disorders using sonogenetics platform pairing engineered ultrasound-sensitive proteins with focused ultrasound delivery.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "SonoNeu home page",
        "url": "https://www.sononeu.com/",
        "publisher": "SonoNeu",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-surgical-theater",
    "companySlug": "surgical-theater",
    "name": "Surgical Theater tracked neurotechnology program",
    "focus": "Neurosurgical planning and clinician-patient communication",
    "modality": "3D patient-specific neurosurgical visualization and planning",
    "statusLabel": "Commercial surgical visualization company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Surgical Theater is retained as a source-backed U.S. neurotechnology program focused on neurosurgical planning and clinician-patient communication using 3d patient-specific neurosurgical visualization and planning.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Surgical Theater official technology / product information",
        "url": "https://surgicaltheater.net/",
        "publisher": "Surgical Theater",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-thync",
    "companySlug": "thync",
    "name": "Thync tracked neurotechnology program",
    "focus": "Stress and sleep support through non-invasive neuromodulation",
    "modality": "Wearable peripheral-nerve stimulation",
    "statusLabel": "Consumer neurotechnology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Thync is retained as a source-backed U.S. neurotechnology program focused on stress and sleep support through non-invasive neuromodulation using wearable peripheral-nerve stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Thync official technology / product information",
        "url": "https://thync.com/",
        "publisher": "Thync",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-vivosense",
    "companySlug": "vivosense",
    "name": "VivoSense tracked neurotechnology program",
    "focus": "Clinical research measurement, including neurological studies",
    "modality": "Wearable-sensor analytics and digital biomarker platform",
    "statusLabel": "Commercial digital biomarker company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "VivoSense is retained as a source-backed U.S. neurotechnology program focused on clinical research measurement, including neurological studies using wearable-sensor analytics and digital biomarker platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "VivoSense official technology / product information",
        "url": "https://vivosense.com/",
        "publisher": "VivoSense",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "us-project-zeto",
    "companySlug": "zeto",
    "name": "Zeto tracked neurotechnology program",
    "focus": "Point-of-care seizure and brain-function assessment",
    "modality": "Rapid EEG headsets and cloud EEG interpretation",
    "statusLabel": "Commercial EEG technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Zeto is retained as a source-backed U.S. neurotechnology program focused on point-of-care seizure and brain-function assessment using rapid eeg headsets and cloud eeg interpretation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Zeto official technology / product information",
        "url": "https://zeto-inc.com/",
        "publisher": "Zeto",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];
