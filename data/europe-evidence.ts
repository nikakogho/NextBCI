import type { Milestone, Paper, ProgramProject, Trial } from "./schema";

/** Inclusive European scope used by the 2026-08-03 evidence audit. */
export const europeanOrganizationSlugs = [
  "aurimod",
  "gtec-unicorn",
  "gtec-medical-engineering",
  "graz-university-of-technology-neurotechnology",
  "med-el",
  "medical-university-of-vienna-neurotechnology",
  "somareality",
  "syntropic",
  "tyromotion",
  "atlas-neuroengineering",
  "brainphonics",
  "cefaly",
  "farow",
  "ghent-university-neurotechnology",
  "icometrix",
  "imec-neurotechnology",
  "ku-leuven-neuroelectronics",
  "neuroclues",
  "neuroventis",
  "nyxoah",
  "revision-implant",
  "synergia-medical",
  "re4life",
  "emhance",
  "pamel",
  "brainbeams-health",
  "brno-university-of-technology-neurotechnology",
  "czech-technical-university-in-prague-neurotechnology",
  "deymed-diagnostic",
  "stimvia",
  "aarhus-university-neurotechnology",
  "brainplus",
  "braincapture",
  "brainreader",
  "cebreo-medical",
  "cercare-medical",
  "cerebriu",
  "imotions",
  "insai",
  "magventure",
  "optoceutics",
  "platoscience",
  "uneeg-medical",
  "neurotech-ai",
  "audicin",
  "bittium",
  "cerenion",
  "helsinki-institute-of-physics-neurotechnology",
  "neuro-event-labs",
  "nexstim",
  "sooma-medical",
  "aix-marseille-universite-neurotechnology",
  "assistance-publique-hopitaux-de-paris-neurotechnology",
  "axorus",
  "bioserenity",
  "carthera",
  "centre-de-recherche-en-neurosciences-de-lyon-neurotechnology",
  "centre-hospitalier-sainte-anne-neurotechnology",
  "centre-national-de-la-recherche-scientifique-neurotechnology",
  "clinatec-wimagine",
  "cognitive-neuroimaging-lab-neurotechnology",
  "dixi-medical",
  "espci-paris-neurotechnology",
  "fhu-neurovasc-neurotechnology",
  "iconeus",
  "inserm-neurotechnology",
  "institut-pasteur-neurotechnology",
  "karavela-ai",
  "naox-technologies",
  "neurinnov",
  "neurosoft-bioelectronics",
  "nextmind-snap-ar",
  "physique-pour-la-medecine-paris-neurotechnology",
  "pixyl",
  "quantalx-neuroscience",
  "qynapse",
  "resolve-stroke",
  "seenel-imaging",
  "sensome",
  "sonomind",
  "sorbonne-universite-neurotechnology",
  "therasonic",
  "universite-claude-bernard-lyon-1-neurotechnology",
  "universite-de-bordeaux-neurotechnology",
  "universite-paris-cite-neurotechnology",
  "wandercraft",
  "wisear",
  "yneuro",
  "bee-medic",
  "bernstein-center-for-computational-neuroscience-berlin-neurotechnology",
  "bernstein-center-for-computational-neuroscience-freiburg-neurotechnology",
  "bielefeld-university-neurotechnology",
  "brain-products",
  "brainlab",
  "central-institute-of-mental-health-neurotechnology",
  "ceregate",
  "charite-universitatsmedizin-berlin-neurotechnology",
  "charlotte-fresenius-hochschule-neurotechnology",
  "cortec",
  "deepspin",
  "einstein-center-for-neurosciences-berlin-neurotechnology",
  "evocal-health",
  "freie-universitat-berlin-neurotechnology",
  "german-center-for-neurodegenerative-diseases-neurotechnology",
  "heidelberg-university-neurotechnology",
  "heinrich-heine-university-dusseldorf-neurotechnology",
  "hochschule-fresenius-neurotechnology",
  "humboldt-universitat-zu-berlin-neurotechnology",
  "implex",
  "insellar",
  "johannes-gutenberg-university-mainz-neurotechnology",
  "leibniz-institute-for-resilience-research-neurotechnology",
  "lmu-klinikum-neurotechnology",
  "ludwig-maximilians-universitat-munchen-neurotechnology",
  "medizinische-hochschule-hannover-neurotechnology",
  "mentalab-explore",
  "munevo",
  "neurocare-group",
  "nirx",
  "nirx-fnirs",
  "nuuron",
  "ottobock",
  "precisis",
  "pupil-labs",
  "sync2brain",
  "technische-universitat-dresden-neurotechnology",
  "tvns-technologies",
  "universitat-ulm-neurotechnology",
  "university-medical-center-freiburg-neurotechnology",
  "university-of-cologne-neurotechnology",
  "freiburg-brainlinks",
  "tuebingen-bci",
  "university-of-wurzburg-neurotechnology",
  "zenowell",
  "aristotle-university-of-thessaloniki-neurotechnology",
  "mindrove",
  "neunos",
  "ossur",
  "capri-medical",
  "mainstay-medical",
  "neurobell",
  "neuromod-devices",
  "bionit-labs",
  "corticale",
  "don-carlo-gnocchi-foundation-neurotechnology",
  "eb-neuro",
  "fondazione-irccs-istituto-neurologico-carlo-besta-neurotechnology",
  "manava-plus",
  "neuromed",
  "newronika",
  "quanta-system-neuro",
  "scuola-superiore-sant-anna-neurotechnology",
  "universita-campus-bio-medico-neurotechnology",
  "universita-degli-studi-di-cassino-e-del-lazio-meridionale-neurotechnology",
  "university-of-bologna-neurotechnology",
  "vibre",
  "wise",
  "nazarbayev-bci-research",
  "birgermind",
  "neurotechnology-lithuania",
  "pulsetto",
  "amsterdam-university-medical-centers-neurotechnology",
  "ant-neuro",
  "ant-neuro-eego",
  "artinis-brite",
  "artinis-medical-systems",
  "biosemi",
  "brain-innovation-rtfmri",
  "erasmus-mc-neurotechnology",
  "maastricht-rtfmri-bci",
  "mind-media",
  "mindaffect",
  "motek-medical",
  "nemo-healthcare",
  "neurocast",
  "nimbus",
  "noldus",
  "onera-health",
  "onward-arc-bci",
  "philips-neuro",
  "purple-gaze",
  "radboud-university-nijmegen-neurotechnology",
  "salvia-bioelectronics",
  "tmsi",
  "tu-delft-neural-engineering",
  "university-medical-center-groningen-neurotechnology",
  "university-medical-center-utrecht-neurotechnology",
  "university-of-groningen-neurotechnology",
  "utrecht-university-neurotechnology",
  "vrije-universiteit-amsterdam-neurotechnology",
  "zander-labs",
  "nordicneurolab",
  "brainscan-ai",
  "cortivision-photon",
  "neuroplay",
  "qviti",
  "solvemed",
  "instituto-politecnico-de-lisboa-neurotechnology",
  "neroes",
  "neuroinova",
  "plux-biosignals",
  "university-of-lisbon-neurotechnology",
  "intelimensa",
  "neurorevive",
  "bitronics-lab",
  "hse-bioelectric-interfaces",
  "institute-of-cell-biophysics-neurotechnology",
  "mitsar-eeg",
  "msu-neurocomputer-interfaces",
  "neiry",
  "neurobotics-russia",
  "neurochat-russia",
  "neurotech-smc",
  "institut-mihajlo-pupin-neurotechnology",
  "mbraintrain-smarting",
  "university-of-belgrade-neurotechnology",
  "nion-neuroscience",
  "braintrip",
  "kinestica",
  "able-human-motion",
  "biomedical-research-networking-center-on-neurodegenerative-diseases-neurotechnology",
  "bitbrain",
  "connectoma-neurotech",
  "corify-care",
  "cortivis",
  "inbrain-neuroelectronics",
  "institucio-catalana-de-recerca-i-estudis-avancats-neurotechnology",
  "institut-catala-de-nanociencia-i-nanotecnologia-neurotechnology",
  "institut-de-microelectronica-de-barcelona-neurotechnology",
  "institut-guttmann-neurotechnology",
  "methinks",
  "mjn-neuroserveis",
  "neuroelectrics",
  "spinally",
  "starlab-neuroscience",
  "time-is-brain",
  "universitat-autonoma-de-barcelona-neurotechnology",
  "brainlink-health",
  "elekta",
  "flow-neuroscience",
  "integrum",
  "karolinska-institutet-neurotechnology",
  "mendi",
  "neuronano",
  "smart-eye",
  "tobii",
  "threebrain",
  "ability-wyss",
  "aleva-neurotherapeutics",
  "artiria-medical",
  "bearmind",
  "bottneuro",
  "brainquant",
  "brnlit-ai",
  "centre-hospitalier-universitaire-vaudois-neurotechnology",
  "clee-medical",
  "comphya",
  "connectome-health",
  "deegtal",
  "eth-relab-fnirs",
  "finalspark",
  "hbimed",
  "idun-technologies",
  "infera-neuro",
  "machinemd",
  "maxwell-biosystems",
  "mindmaze",
  "myoswiss",
  "neurorestore-epfl-bsi",
  "optohive",
  "positrigo",
  "rhovica-neuroimaging",
  "university-of-geneva-neurotechnology",
  "university-of-lausanne-neurotechnology",
  "university-of-zurich-neurotechnology",
  "xanastim",
  "itu-cognitive-systems-bci",
  "ktu-biomedical-bci",
  "sciencebeam",
  "vagustim",
  "eightsix-science",
  "emteq-labs",
  "kneu-health",
  "machine-medicine",
  "mintneuro",
  "myndspan",
  "netholabs",
  "neupulse",
  "neuralpulse",
  "neuroconcise",
  "neuronic",
  "neuronostics",
  "neurox",
  "panda-surgical",
  "pieeg",
  "prima-mente",
  "qv-bioelectronics",
  "samphire-neuroscience",
  "sona",
  "thymia",
  "esper-bionics",
  "amber-therapeutics",
  "bioinduction",
  "bios-health",
  "brainomix",
  "brainpatch",
  "brainwavebank",
  "cambridge-cognition",
  "cambridge-neurotech",
  "cardiff-university-neurotechnology",
  "cerca-magnetics",
  "charco-neurotech",
  "cogitat",
  "coherence-neuro",
  "comind",
  "covvi",
  "cumulus-neuroscience",
  "ear-switch",
  "galvani-bioelectronics",
  "gowerlabs-lumo",
  "gripable",
  "imperial-neural-interfaces",
  "king-s-college-london-neurotechnology",
  "livanova",
  "magstim",
  "medical-research-council-neurotechnology",
  "mindportal",
  "myndplay",
  "national-hospital-for-neurology-and-neurosurgery-neurotechnology",
  "neubond",
  "neurofenix",
  "neurovalens",
  "newcastle-university-neurotechnology",
  "nia-therapeutics",
  "nurokor",
  "nuropod",
  "open-bionics",
  "oxehealth",
  "parasym",
  "phagenesis",
  "renishaw-neuro-solutions",
  "scottish-brain-sciences",
  "sinaptica-therapeutics",
  "ucl-neurotechnology",
  "cambridge-neural-interface",
  "glasgow-bci",
  "university-of-liverpool-neurotechnology",
  "university-of-nottingham-neurotechnology",
  "oxford-neural-engineering",
  "university-of-plymouth-neurotechnology",
  "warwick-neurotechnology",
  "unlimited-tomorrow"
] as const;

export const europeEvidencePapers: Paper[] = [
  {
    "id": "europe-paper-graz-university-of-technology-neurotechnology",
    "title": "Non-Invasive Brain-Computer Interfaces: State of the Art and Trends",
    "companySlug": "graz-university-of-technology-neurotechnology",
    "dateLabel": "2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Graz University of Technology reports “Non-Invasive Brain-Computer Interfaces: State of the Art and Trends”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Non-Invasive Brain-Computer Interfaces: State of the Art and Trends",
        "url": "https://doi.org/10.1109/rbme.2024.3449790",
        "publisher": "Institute of Electrical and Electronics Engineers (IEEE)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-medical-university-of-vienna-neurotechnology",
    "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
    "companySlug": "medical-university-of-vienna-neurotechnology",
    "dateLabel": "20 Jul 2024",
    "sortDate": "2024-07-20",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Medical University of Vienna reports “Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-syntropic",
    "title": "Exploring neural entrainment and synchrony in response to repeated 60 Hz flickering white light in healthy volunteers",
    "companySlug": "syntropic",
    "dateLabel": "Jul 2025",
    "sortDate": "2025-07-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Syntropic's research profile reports “Exploring neural entrainment and synchrony in response to repeated 60 Hz flickering white light in healthy volunteers”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Exploring neural entrainment and synchrony in response to repeated 60 Hz flickering white light in healthy volunteers",
        "url": "https://doi.org/10.1371/journal.pone.0332310",
        "publisher": "PLOS ONE",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-ghent-university-neurotechnology",
    "title": "Using Compound Neural Action Potentials for Functional Validation of a High-Density Intraneural Interface: A Preliminary Study",
    "companySlug": "ghent-university-neurotechnology",
    "dateLabel": "17 Feb 2024",
    "sortDate": "2024-02-17",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Ghent University reports “Using Compound Neural Action Potentials for Functional Validation of a High-Density Intraneural Interface: A Preliminary Study”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Using Compound Neural Action Potentials for Functional Validation of a High-Density Intraneural Interface: A Preliminary Study",
        "url": "https://doi.org/10.3390/mi15020280",
        "publisher": "MDPI AG",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-imec-neurotechnology",
    "title": "Using Compound Neural Action Potentials for Functional Validation of a High-Density Intraneural Interface: A Preliminary Study",
    "companySlug": "imec-neurotechnology",
    "dateLabel": "17 Feb 2024",
    "sortDate": "2024-02-17",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to IMEC reports “Using Compound Neural Action Potentials for Functional Validation of a High-Density Intraneural Interface: A Preliminary Study”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Using Compound Neural Action Potentials for Functional Validation of a High-Density Intraneural Interface: A Preliminary Study",
        "url": "https://doi.org/10.3390/mi15020280",
        "publisher": "MDPI AG",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-ku-leuven-neuroelectronics",
    "title": "How about taking a low‐cost, small, and wireless <scp>EEG</scp> for a walk?",
    "companySlug": "ku-leuven-neuroelectronics",
    "dateLabel": "26 Sept 2012",
    "sortDate": "2012-09-26",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to KU Leuven Neuroelectronics Research reports “How about taking a low‐cost, small, and wireless <scp>EEG</scp> for a walk?”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "How about taking a low‐cost, small, and wireless <scp>EEG</scp> for a walk?",
        "url": "https://doi.org/10.1111/j.1469-8986.2012.01471.x",
        "publisher": "Psychophysiology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-brno-university-of-technology-neurotechnology",
    "title": "Acute to long-term characteristics of impedance recordings during neurostimulation in humans",
    "companySlug": "brno-university-of-technology-neurotechnology",
    "dateLabel": "1 Apr 2024",
    "sortDate": "2024-04-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Brno University of Technology reports “Acute to long-term characteristics of impedance recordings during neurostimulation in humans”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Acute to long-term characteristics of impedance recordings during neurostimulation in humans",
        "url": "https://doi.org/10.1088/1741-2552/ad3416",
        "publisher": "IOP Publishing",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-czech-technical-university-in-prague-neurotechnology",
    "title": "Acute to long-term characteristics of impedance recordings during neurostimulation in humans",
    "companySlug": "czech-technical-university-in-prague-neurotechnology",
    "dateLabel": "1 Apr 2024",
    "sortDate": "2024-04-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Czech Technical University in Prague reports “Acute to long-term characteristics of impedance recordings during neurostimulation in humans”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Acute to long-term characteristics of impedance recordings during neurostimulation in humans",
        "url": "https://doi.org/10.1088/1741-2552/ad3416",
        "publisher": "IOP Publishing",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-aarhus-university-neurotechnology",
    "title": "A systematic review on functional electrical stimulation based rehabilitation systems for upper limb post-stroke recovery",
    "companySlug": "aarhus-university-neurotechnology",
    "dateLabel": "8 Dec 2023",
    "sortDate": "2023-12-08",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Aarhus University reports “A systematic review on functional electrical stimulation based rehabilitation systems for upper limb post-stroke recovery”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A systematic review on functional electrical stimulation based rehabilitation systems for upper limb post-stroke recovery",
        "url": "https://doi.org/10.3389/fneur.2023.1272992",
        "publisher": "Frontiers Media SA",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-helsinki-institute-of-physics-neurotechnology",
    "title": "Low-threshold, high-resolution, chronically stable intracortical microstimulation by ultraflexible electrodes",
    "companySlug": "helsinki-institute-of-physics-neurotechnology",
    "dateLabel": "Jun 2023",
    "sortDate": "2023-06-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Helsinki Institute of Physics reports “Low-threshold, high-resolution, chronically stable intracortical microstimulation by ultraflexible electrodes”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Low-threshold, high-resolution, chronically stable intracortical microstimulation by ultraflexible electrodes",
        "url": "https://doi.org/10.1016/j.celrep.2023.112554",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-aix-marseille-universite-neurotechnology",
    "title": "Class imbalance should not throw you off balance: Choosing the right classifiers and performance metrics for brain decoding with imbalanced data",
    "companySlug": "aix-marseille-universite-neurotechnology",
    "dateLabel": "Aug 2023",
    "sortDate": "2023-08-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Aix-Marseille Université reports “Class imbalance should not throw you off balance: Choosing the right classifiers and performance metrics for brain decoding with imbalanced data”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Class imbalance should not throw you off balance: Choosing the right classifiers and performance metrics for brain decoding with imbalanced data",
        "url": "https://doi.org/10.1016/j.neuroimage.2023.120253",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-assistance-publique-hopitaux-de-paris-neurotechnology",
    "title": "Learning to operate an imagined speech Brain-Computer Interface involves the spatial and frequency tuning of neural activity",
    "companySlug": "assistance-publique-hopitaux-de-paris-neurotechnology",
    "dateLabel": "20 Feb 2025",
    "sortDate": "2025-02-20",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Assistance Publique – Hôpitaux de Paris reports “Learning to operate an imagined speech Brain-Computer Interface involves the spatial and frequency tuning of neural activity”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Learning to operate an imagined speech Brain-Computer Interface involves the spatial and frequency tuning of neural activity",
        "url": "https://doi.org/10.1038/s42003-025-07464-7",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-axorus",
    "title": "A flexible photoacoustic retinal prosthesis",
    "companySlug": "axorus",
    "dateLabel": "23 Dec 2025",
    "sortDate": "2025-12-23",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Axorus's research profile reports “A flexible photoacoustic retinal prosthesis”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "A flexible photoacoustic retinal prosthesis",
        "url": "https://doi.org/10.1038/s41467-025-67518-6",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-centre-de-recherche-en-neurosciences-de-lyon-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "centre-de-recherche-en-neurosciences-de-lyon-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Centre de Recherche en Neurosciences de Lyon reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-centre-hospitalier-sainte-anne-neurotechnology",
    "title": "ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation",
    "companySlug": "centre-hospitalier-sainte-anne-neurotechnology",
    "dateLabel": "Nov 2025",
    "sortDate": "2025-11-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Centre Hospitalier Sainte-Anne reports “ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-centre-national-de-la-recherche-scientifique-neurotechnology",
    "title": "ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation",
    "companySlug": "centre-national-de-la-recherche-scientifique-neurotechnology",
    "dateLabel": "Nov 2025",
    "sortDate": "2025-11-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Centre National de la Recherche Scientifique reports “ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-cognitive-neuroimaging-lab-neurotechnology",
    "title": "Open letter on intervention regimes and adverse events in focused ultrasound for neuromodulation",
    "companySlug": "cognitive-neuroimaging-lab-neurotechnology",
    "dateLabel": "Jan 2026",
    "sortDate": "2026-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Cognitive Neuroimaging Lab reports “Open letter on intervention regimes and adverse events in focused ultrasound for neuromodulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-espci-paris-neurotechnology",
    "title": "ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation",
    "companySlug": "espci-paris-neurotechnology",
    "dateLabel": "Nov 2025",
    "sortDate": "2025-11-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to ESPCI Paris reports “ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-fhu-neurovasc-neurotechnology",
    "title": "ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation",
    "companySlug": "fhu-neurovasc-neurotechnology",
    "dateLabel": "Nov 2025",
    "sortDate": "2025-11-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to FHU Neurovasc reports “ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-inserm-neurotechnology",
    "title": "A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium",
    "companySlug": "inserm-neurotechnology",
    "dateLabel": "Mar 2025",
    "sortDate": "2025-03-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Inserm reports “A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-institut-pasteur-neurotechnology",
    "title": "Learning to operate an imagined speech Brain-Computer Interface involves the spatial and frequency tuning of neural activity",
    "companySlug": "institut-pasteur-neurotechnology",
    "dateLabel": "20 Feb 2025",
    "sortDate": "2025-02-20",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Institut Pasteur reports “Learning to operate an imagined speech Brain-Computer Interface involves the spatial and frequency tuning of neural activity”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Learning to operate an imagined speech Brain-Computer Interface involves the spatial and frequency tuning of neural activity",
        "url": "https://doi.org/10.1038/s42003-025-07464-7",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-physique-pour-la-medecine-paris-neurotechnology",
    "title": "Strengths and weaknesses of transcranial ultrasound stimulation and its promise in psychiatry: an overview of the technology and a systematic review of the clinical applications",
    "companySlug": "physique-pour-la-medecine-paris-neurotechnology",
    "dateLabel": "5 Aug 2025",
    "sortDate": "2025-08-05",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Physique pour la médecine Paris reports “Strengths and weaknesses of transcranial ultrasound stimulation and its promise in psychiatry: an overview of the technology and a systematic review of the clinical applications”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Strengths and weaknesses of transcranial ultrasound stimulation and its promise in psychiatry: an overview of the technology and a systematic review of the clinical applications",
        "url": "https://doi.org/10.1080/02656736.2025.2539986",
        "publisher": "Informa UK Limited",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-qynapse",
    "title": "Validation of an automatic tool for the rapid measurement of brain atrophy and white matter hyperintensity: QyScore®",
    "companySlug": "qynapse",
    "dateLabel": "1 Jan 2022",
    "sortDate": "2022-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Qynapse's research profile reports “Validation of an automatic tool for the rapid measurement of brain atrophy and white matter hyperintensity: QyScore®”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Validation of an automatic tool for the rapid measurement of brain atrophy and white matter hyperintensity: QyScore®",
        "url": "https://doi.org/10.1007/s00330-021-08385-9",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-sorbonne-universite-neurotechnology",
    "title": "Sustained reduction of essential tremor with low-power non-thermal transcranial focused ultrasound stimulations in humans",
    "companySlug": "sorbonne-universite-neurotechnology",
    "dateLabel": "May 2024",
    "sortDate": "2024-05-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Sorbonne Université reports “Sustained reduction of essential tremor with low-power non-thermal transcranial focused ultrasound stimulations in humans”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Sustained reduction of essential tremor with low-power non-thermal transcranial focused ultrasound stimulations in humans",
        "url": "https://doi.org/10.1016/j.brs.2024.05.003",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-universite-claude-bernard-lyon-1-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "universite-claude-bernard-lyon-1-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Université Claude Bernard Lyon 1 reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-universite-de-bordeaux-neurotechnology",
    "title": "Large scale investigation of the effect of gender on mu rhythm suppression in motor imagery brain-computer interfaces",
    "companySlug": "universite-de-bordeaux-neurotechnology",
    "dateLabel": "4 May 2024",
    "sortDate": "2024-05-04",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Université de Bordeaux reports “Large scale investigation of the effect of gender on mu rhythm suppression in motor imagery brain-computer interfaces”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Large scale investigation of the effect of gender on mu rhythm suppression in motor imagery brain-computer interfaces",
        "url": "https://doi.org/10.1080/2326263x.2024.2345449",
        "publisher": "Informa UK Limited",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-universite-paris-cite-neurotechnology",
    "title": "ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation",
    "companySlug": "universite-paris-cite-neurotechnology",
    "dateLabel": "Nov 2025",
    "sortDate": "2025-11-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Université Paris Cité reports “ITRUSST consensus on biophysical safety for transcranial ultrasound stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-bernstein-center-for-computational-neuroscience-berlin-neurotechnology",
    "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
    "companySlug": "bernstein-center-for-computational-neuroscience-berlin-neurotechnology",
    "dateLabel": "15 Apr 2025",
    "sortDate": "2025-04-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Bernstein Center for Computational Neuroscience Berlin reports “Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
        "url": "https://doi.org/10.1038/s41467-025-58825-z",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-bernstein-center-for-computational-neuroscience-freiburg-neurotechnology",
    "title": "Dareplane: a modular open-source software platform for BCI research with application in closed-loop deep brain stimulation",
    "companySlug": "bernstein-center-for-computational-neuroscience-freiburg-neurotechnology",
    "dateLabel": "24 Mar 2025",
    "sortDate": "2025-03-24",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Bernstein Center for Computational Neuroscience Freiburg reports “Dareplane: a modular open-source software platform for BCI research with application in closed-loop deep brain stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Dareplane: a modular open-source software platform for BCI research with application in closed-loop deep brain stimulation",
        "url": "https://doi.org/10.1088/1741-2552/adbb20",
        "publisher": "IOP Publishing",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-bielefeld-university-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "bielefeld-university-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Bielefeld University reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-central-institute-of-mental-health-neurotechnology",
    "title": "Neurofeedback for Attention-Deficit/Hyperactivity Disorder",
    "companySlug": "central-institute-of-mental-health-neurotechnology",
    "dateLabel": "1 Feb 2025",
    "sortDate": "2025-02-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Central Institute of Mental Health reports “Neurofeedback for Attention-Deficit/Hyperactivity Disorder”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Neurofeedback for Attention-Deficit/Hyperactivity Disorder",
        "url": "https://doi.org/10.1001/jamapsychiatry.2024.3702",
        "publisher": "American Medical Association (AMA)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-charite-universitatsmedizin-berlin-neurotechnology",
    "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
    "companySlug": "charite-universitatsmedizin-berlin-neurotechnology",
    "dateLabel": "15 Apr 2025",
    "sortDate": "2025-04-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Charité - Universitätsmedizin Berlin reports “Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
        "url": "https://doi.org/10.1038/s41467-025-58825-z",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-charlotte-fresenius-hochschule-neurotechnology",
    "title": "Home-Use Transcranial Direct Current Stimulation for the Treatment of a Major Depressive Episode",
    "companySlug": "charlotte-fresenius-hochschule-neurotechnology",
    "dateLabel": "1 Apr 2024",
    "sortDate": "2024-04-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Charlotte Fresenius Hochschule reports “Home-Use Transcranial Direct Current Stimulation for the Treatment of a Major Depressive Episode”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Home-Use Transcranial Direct Current Stimulation for the Treatment of a Major Depressive Episode",
        "url": "https://doi.org/10.1001/jamapsychiatry.2023.4948",
        "publisher": "American Medical Association (AMA)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-einstein-center-for-neurosciences-berlin-neurotechnology",
    "title": "Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease",
    "companySlug": "einstein-center-for-neurosciences-berlin-neurotechnology",
    "dateLabel": "19 Mar 2025",
    "sortDate": "2025-03-19",
    "evidenceLevel": "E2",
    "summary": "A preprint with author affiliation to Einstein Center for Neurosciences Berlin reports “Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease",
        "url": "https://doi.org/10.1101/2025.03.19.642627",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-freie-universitat-berlin-neurotechnology",
    "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
    "companySlug": "freie-universitat-berlin-neurotechnology",
    "dateLabel": "15 Apr 2025",
    "sortDate": "2025-04-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Freie Universität Berlin reports “Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
        "url": "https://doi.org/10.1038/s41467-025-58825-z",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-german-center-for-neurodegenerative-diseases-neurotechnology",
    "title": "Modulation of subthalamic beta oscillations by movement, dopamine, and deep brain stimulation in Parkinson’s disease",
    "companySlug": "german-center-for-neurodegenerative-diseases-neurotechnology",
    "dateLabel": "5 Apr 2024",
    "sortDate": "2024-04-05",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to German Center for Neurodegenerative Diseases reports “Modulation of subthalamic beta oscillations by movement, dopamine, and deep brain stimulation in Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Modulation of subthalamic beta oscillations by movement, dopamine, and deep brain stimulation in Parkinson’s disease",
        "url": "https://doi.org/10.1038/s41531-024-00693-3",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-heidelberg-university-neurotechnology",
    "title": "Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease",
    "companySlug": "heidelberg-university-neurotechnology",
    "dateLabel": "19 Mar 2025",
    "sortDate": "2025-03-19",
    "evidenceLevel": "E2",
    "summary": "A preprint with author affiliation to Heidelberg University reports “Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease",
        "url": "https://doi.org/10.1101/2025.03.19.642627",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-heinrich-heine-university-dusseldorf-neurotechnology",
    "title": "Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease",
    "companySlug": "heinrich-heine-university-dusseldorf-neurotechnology",
    "dateLabel": "19 Mar 2025",
    "sortDate": "2025-03-19",
    "evidenceLevel": "E2",
    "summary": "A preprint with author affiliation to Heinrich Heine University Düsseldorf reports “Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Differential modulation of movement speed with state-dependent deep brain stimulation in Parkinson’s disease",
        "url": "https://doi.org/10.1101/2025.03.19.642627",
        "publisher": "openRxiv",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-hochschule-fresenius-neurotechnology",
    "title": "Home-Use Transcranial Direct Current Stimulation for the Treatment of a Major Depressive Episode",
    "companySlug": "hochschule-fresenius-neurotechnology",
    "dateLabel": "1 Apr 2024",
    "sortDate": "2024-04-01",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Hochschule Fresenius reports “Home-Use Transcranial Direct Current Stimulation for the Treatment of a Major Depressive Episode”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Home-Use Transcranial Direct Current Stimulation for the Treatment of a Major Depressive Episode",
        "url": "https://doi.org/10.1001/jamapsychiatry.2023.4948",
        "publisher": "American Medical Association (AMA)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-humboldt-universitat-zu-berlin-neurotechnology",
    "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
    "companySlug": "humboldt-universitat-zu-berlin-neurotechnology",
    "dateLabel": "15 Apr 2025",
    "sortDate": "2025-04-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Humboldt-Universität zu Berlin reports “Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Shared pathway-specific network mechanisms of dopamine and deep brain stimulation for the treatment of Parkinson’s disease",
        "url": "https://doi.org/10.1038/s41467-025-58825-z",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-johannes-gutenberg-university-mainz-neurotechnology",
    "title": "A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium",
    "companySlug": "johannes-gutenberg-university-mainz-neurotechnology",
    "dateLabel": "Mar 2025",
    "sortDate": "2025-03-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Johannes Gutenberg University Mainz reports “A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-leibniz-institute-for-resilience-research-neurotechnology",
    "title": "A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium",
    "companySlug": "leibniz-institute-for-resilience-research-neurotechnology",
    "dateLabel": "Mar 2025",
    "sortDate": "2025-03-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Leibniz Institute for Resilience Research reports “A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-lmu-klinikum-neurotechnology",
    "title": "Wearable non-invasive neuroprosthesis for targeted sensory restoration in neuropathy",
    "companySlug": "lmu-klinikum-neurotechnology",
    "dateLabel": "30 Dec 2024",
    "sortDate": "2024-12-30",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to LMU Klinikum reports “Wearable non-invasive neuroprosthesis for targeted sensory restoration in neuropathy”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Wearable non-invasive neuroprosthesis for targeted sensory restoration in neuropathy",
        "url": "https://doi.org/10.1038/s41467-024-55152-7",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-ludwig-maximilians-universitat-munchen-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "ludwig-maximilians-universitat-munchen-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Ludwig-Maximilians-Universität München reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-medizinische-hochschule-hannover-neurotechnology",
    "title": "Bridging Minds and Machines: The Recent Advances of Brain-Computer Interfaces in Neurological and Neurosurgical Applications",
    "companySlug": "medizinische-hochschule-hannover-neurotechnology",
    "dateLabel": "Sept 2024",
    "sortDate": "2024-09-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Medizinische Hochschule Hannover reports “Bridging Minds and Machines: The Recent Advances of Brain-Computer Interfaces in Neurological and Neurosurgical Applications”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Bridging Minds and Machines: The Recent Advances of Brain-Computer Interfaces in Neurological and Neurosurgical Applications",
        "url": "https://doi.org/10.1016/j.wneu.2024.05.104",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-technische-universitat-dresden-neurotechnology",
    "title": "Recent Advancements in Graphene-Based Implantable Electrodes for Neural Recording/Stimulation",
    "companySlug": "technische-universitat-dresden-neurotechnology",
    "dateLabel": "18 Dec 2023",
    "sortDate": "2023-12-18",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Technische Universität Dresden reports “Recent Advancements in Graphene-Based Implantable Electrodes for Neural Recording/Stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Recent Advancements in Graphene-Based Implantable Electrodes for Neural Recording/Stimulation",
        "url": "https://doi.org/10.3390/s23249911",
        "publisher": "MDPI AG",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-universitat-ulm-neurotechnology",
    "title": "Analyzing and computing humans by means of the brain using Brain-Computer Interfaces - understanding the user – previous evidence, self-relevance and the user’s self-concept as potential superordinate human factors of relevance",
    "companySlug": "universitat-ulm-neurotechnology",
    "dateLabel": "16 Feb 2024",
    "sortDate": "2024-02-16",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Universität Ulm reports “Analyzing and computing humans by means of the brain using Brain-Computer Interfaces - understanding the user – previous evidence, self-relevance and the user’s self-concept as potential superordinate human factors of relevance”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Analyzing and computing humans by means of the brain using Brain-Computer Interfaces - understanding the user – previous evidence, self-relevance and the user’s self-concept as potential superordinate human factors of relevance",
        "url": "https://doi.org/10.3389/fnhum.2023.1286895",
        "publisher": "Frontiers Media SA",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-medical-center-freiburg-neurotechnology",
    "title": "Dareplane: a modular open-source software platform for BCI research with application in closed-loop deep brain stimulation",
    "companySlug": "university-medical-center-freiburg-neurotechnology",
    "dateLabel": "24 Mar 2025",
    "sortDate": "2025-03-24",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University Medical Center Freiburg reports “Dareplane: a modular open-source software platform for BCI research with application in closed-loop deep brain stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Dareplane: a modular open-source software platform for BCI research with application in closed-loop deep brain stimulation",
        "url": "https://doi.org/10.1088/1741-2552/adbb20",
        "publisher": "IOP Publishing",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-cologne-neurotechnology",
    "title": "Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation",
    "companySlug": "university-of-cologne-neurotechnology",
    "dateLabel": "22 Feb 2024",
    "sortDate": "2024-02-22",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Cologne reports “Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation",
        "url": "https://doi.org/10.1038/s41593-024-01570-1",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-freiburg-brainlinks",
    "title": "Review of the BCI Competition IV",
    "companySlug": "freiburg-brainlinks",
    "dateLabel": "1 Jan 2012",
    "sortDate": "2012-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Freiburg BrainLinks-BrainTools reports “Review of the BCI Competition IV”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Review of the BCI Competition IV",
        "url": "https://doi.org/10.3389/fnins.2012.00055",
        "publisher": "Frontiers in Neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-tuebingen-bci",
    "title": "World's fastest brain-computer interface: Combining EEG2Code with deep learning",
    "companySlug": "tuebingen-bci",
    "dateLabel": "6 Sept 2019",
    "sortDate": "2019-09-06",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Tuebingen BCI Research reports “World's fastest brain-computer interface: Combining EEG2Code with deep learning”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "World's fastest brain-computer interface: Combining EEG2Code with deep learning",
        "url": "https://doi.org/10.1371/journal.pone.0221909",
        "publisher": "PLOS ONE",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-wurzburg-neurotechnology",
    "title": "Deep brain stimulation of symptom-specific networks in Parkinson’s disease",
    "companySlug": "university-of-wurzburg-neurotechnology",
    "dateLabel": "31 May 2024",
    "sortDate": "2024-05-31",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Würzburg reports “Deep brain stimulation of symptom-specific networks in Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Deep brain stimulation of symptom-specific networks in Parkinson’s disease",
        "url": "https://doi.org/10.1038/s41467-024-48731-1",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-aristotle-university-of-thessaloniki-neurotechnology",
    "title": "Wearable neurofeedback acceptance model for students’ stress and anxiety management in academic settings",
    "companySlug": "aristotle-university-of-thessaloniki-neurotechnology",
    "dateLabel": "24 Oct 2024",
    "sortDate": "2024-10-24",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Aristotle University of Thessaloniki reports “Wearable neurofeedback acceptance model for students’ stress and anxiety management in academic settings”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Wearable neurofeedback acceptance model for students’ stress and anxiety management in academic settings",
        "url": "https://doi.org/10.1371/journal.pone.0304932",
        "publisher": "Public Library of Science (PLoS)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-corticale",
    "title": "Phagocytosis by retinal pigment epithelium and microglia does not affect vision restoration by P3HT nanoparticles in Retinitis pigmentosa",
    "companySlug": "corticale",
    "dateLabel": "3 Mar 2026",
    "sortDate": "2026-03-03",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Corticale's research profile reports “Phagocytosis by retinal pigment epithelium and microglia does not affect vision restoration by P3HT nanoparticles in Retinitis pigmentosa”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Phagocytosis by retinal pigment epithelium and microglia does not affect vision restoration by P3HT nanoparticles in Retinitis pigmentosa",
        "url": "https://doi.org/10.1038/s41419-026-08510-w",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-don-carlo-gnocchi-foundation-neurotechnology",
    "title": "Hybrid brain/neural interface and autonomous vision-guided whole-arm exoskeleton control to perform activities of daily living (ADLs)",
    "companySlug": "don-carlo-gnocchi-foundation-neurotechnology",
    "dateLabel": "6 May 2023",
    "sortDate": "2023-05-06",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Don Carlo Gnocchi Foundation reports “Hybrid brain/neural interface and autonomous vision-guided whole-arm exoskeleton control to perform activities of daily living (ADLs)”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Hybrid brain/neural interface and autonomous vision-guided whole-arm exoskeleton control to perform activities of daily living (ADLs)",
        "url": "https://doi.org/10.1186/s12984-023-01185-w",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-fondazione-irccs-istituto-neurologico-carlo-besta-neurotechnology",
    "title": "Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation",
    "companySlug": "fondazione-irccs-istituto-neurologico-carlo-besta-neurotechnology",
    "dateLabel": "22 Feb 2024",
    "sortDate": "2024-02-22",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Fondazione IRCCS Istituto Neurologico Carlo Besta reports “Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation",
        "url": "https://doi.org/10.1038/s41593-024-01570-1",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-newronika",
    "title": "Real-world chronic recordings from implantable adaptive deep brain stimulation systems for Parkinson's disease motor state classification.",
    "companySlug": "newronika",
    "dateLabel": "2026",
    "sortDate": "2026-01-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Newronika's research profile reports “Real-world chronic recordings from implantable adaptive deep brain stimulation systems for Parkinson's disease motor state classification.”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Real-world chronic recordings from implantable adaptive deep brain stimulation systems for Parkinson's disease motor state classification.",
        "url": "https://doi.org/10.3389/fbinf.2026.1820165",
        "publisher": "Frontiers in bioinformatics",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-scuola-superiore-sant-anna-neurotechnology",
    "title": "Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation",
    "companySlug": "scuola-superiore-sant-anna-neurotechnology",
    "dateLabel": "22 Feb 2024",
    "sortDate": "2024-02-22",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Scuola Superiore Sant'Anna reports “Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Mapping dysfunctional circuits in the frontal cortex using deep brain stimulation",
        "url": "https://doi.org/10.1038/s41593-024-01570-1",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-universita-campus-bio-medico-neurotechnology",
    "title": "Hybrid brain/neural interface and autonomous vision-guided whole-arm exoskeleton control to perform activities of daily living (ADLs)",
    "companySlug": "universita-campus-bio-medico-neurotechnology",
    "dateLabel": "6 May 2023",
    "sortDate": "2023-05-06",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Università Campus Bio-Medico reports “Hybrid brain/neural interface and autonomous vision-guided whole-arm exoskeleton control to perform activities of daily living (ADLs)”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Hybrid brain/neural interface and autonomous vision-guided whole-arm exoskeleton control to perform activities of daily living (ADLs)",
        "url": "https://doi.org/10.1186/s12984-023-01185-w",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-universita-degli-studi-di-cassino-e-del-lazio-meridionale-neurotechnology",
    "title": "Integrated use of biofeedback and neurofeedback techniques in treating pathological conditions and improving performance: a narrative review",
    "companySlug": "universita-degli-studi-di-cassino-e-del-lazio-meridionale-neurotechnology",
    "dateLabel": "19 Mar 2024",
    "sortDate": "2024-03-19",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Università degli studi di Cassino e del Lazio Meridionale reports “Integrated use of biofeedback and neurofeedback techniques in treating pathological conditions and improving performance: a narrative review”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Integrated use of biofeedback and neurofeedback techniques in treating pathological conditions and improving performance: a narrative review",
        "url": "https://doi.org/10.3389/fnins.2024.1358481",
        "publisher": "Frontiers Media SA",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-bologna-neurotechnology",
    "title": "MI-BMInet: An Efficient Convolutional Neural Network for Motor Imagery Brain–Machine Interfaces With EEG Channel Selection",
    "companySlug": "university-of-bologna-neurotechnology",
    "dateLabel": "15 Mar 2024",
    "sortDate": "2024-03-15",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Bologna reports “MI-BMInet: An Efficient Convolutional Neural Network for Motor Imagery Brain–Machine Interfaces With EEG Channel Selection”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "MI-BMInet: An Efficient Convolutional Neural Network for Motor Imagery Brain–Machine Interfaces With EEG Channel Selection",
        "url": "https://doi.org/10.1109/jsen.2024.3353146",
        "publisher": "Institute of Electrical and Electronics Engineers (IEEE)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-nazarbayev-bci-research",
    "title": "EEG dataset and OpenBMI toolbox for three BCI paradigms: an investigation into BCI illiteracy",
    "companySlug": "nazarbayev-bci-research",
    "dateLabel": "30 Jan 2019",
    "sortDate": "2019-01-30",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Nazarbayev University BCI and Neural AI Research reports “EEG dataset and OpenBMI toolbox for three BCI paradigms: an investigation into BCI illiteracy”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "EEG dataset and OpenBMI toolbox for three BCI paradigms: an investigation into BCI illiteracy",
        "url": "https://doi.org/10.1093/gigascience/giz002",
        "publisher": "GigaScience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-amsterdam-university-medical-centers-neurotechnology",
    "title": "Deep brain stimulation of symptom-specific networks in Parkinson’s disease",
    "companySlug": "amsterdam-university-medical-centers-neurotechnology",
    "dateLabel": "31 May 2024",
    "sortDate": "2024-05-31",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Amsterdam University Medical Centers reports “Deep brain stimulation of symptom-specific networks in Parkinson’s disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Deep brain stimulation of symptom-specific networks in Parkinson’s disease",
        "url": "https://doi.org/10.1038/s41467-024-48731-1",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-erasmus-mc-neurotechnology",
    "title": "Spinal Cord Stimulation vs Medical Management for Chronic Back and Leg Pain",
    "companySlug": "erasmus-mc-neurotechnology",
    "dateLabel": "14 Nov 2024",
    "sortDate": "2024-11-14",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Erasmus MC reports “Spinal Cord Stimulation vs Medical Management for Chronic Back and Leg Pain”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Spinal Cord Stimulation vs Medical Management for Chronic Back and Leg Pain",
        "url": "https://doi.org/10.1001/jamanetworkopen.2024.44608",
        "publisher": "American Medical Association (AMA)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-radboud-university-nijmegen-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "radboud-university-nijmegen-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Radboud University Nijmegen reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-tu-delft-neural-engineering",
    "title": "Reversing cognitive–motor impairments in Parkinson’s disease patients using a computational modelling approach to deep brain stimulation programming",
    "companySlug": "tu-delft-neural-engineering",
    "dateLabel": "8 Jan 2010",
    "sortDate": "2010-01-08",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to TU Delft Neural Engineering Research reports “Reversing cognitive–motor impairments in Parkinson’s disease patients using a computational modelling approach to deep brain stimulation programming”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Reversing cognitive–motor impairments in Parkinson’s disease patients using a computational modelling approach to deep brain stimulation programming",
        "url": "https://doi.org/10.1093/brain/awp315",
        "publisher": "Brain",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-medical-center-groningen-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "university-medical-center-groningen-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University Medical Center Groningen reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-university-medical-center-utrecht-neurotechnology",
    "title": "Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS",
    "companySlug": "university-medical-center-utrecht-neurotechnology",
    "dateLabel": "26 Apr 2024",
    "sortDate": "2024-04-26",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University Medical Center Utrecht reports “Online speech synthesis using a chronically implanted brain–computer interface in an individual with ALS”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-university-of-groningen-neurotechnology",
    "title": "Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis",
    "companySlug": "university-of-groningen-neurotechnology",
    "dateLabel": "16 Mar 2026",
    "sortDate": "2026-03-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Groningen reports “Transcranial electrical stimulation for the treatment of obsessive–compulsive disorder: a triple meta-analysis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-utrecht-university-neurotechnology",
    "title": "Longevity of a Brain–Computer Interface for Amyotrophic Lateral Sclerosis",
    "companySlug": "utrecht-university-neurotechnology",
    "dateLabel": "15 Aug 2024",
    "sortDate": "2024-08-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Utrecht University reports “Longevity of a Brain–Computer Interface for Amyotrophic Lateral Sclerosis”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Longevity of a Brain–Computer Interface for Amyotrophic Lateral Sclerosis",
        "url": "https://doi.org/10.1056/nejmoa2314598",
        "publisher": "Massachusetts Medical Society",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-vrije-universiteit-amsterdam-neurotechnology",
    "title": "Biophysical effects and neuromodulatory dose of transcranial ultrasonic stimulation",
    "companySlug": "vrije-universiteit-amsterdam-neurotechnology",
    "dateLabel": "May 2025",
    "sortDate": "2025-05-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Vrije Universiteit Amsterdam reports “Biophysical effects and neuromodulatory dose of transcranial ultrasonic stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Biophysical effects and neuromodulatory dose of transcranial ultrasonic stimulation",
        "url": "https://doi.org/10.1016/j.brs.2025.02.019",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-qviti",
    "title": "Low intensity transcranial electric stimulation: Safety, ethical, legal regulatory and application guidelines",
    "companySlug": "qviti",
    "dateLabel": "Sept 2017",
    "sortDate": "2017-09-01",
    "evidenceLevel": "E2",
    "summary": "A publication linked from QVITI's research profile reports “Low intensity transcranial electric stimulation: Safety, ethical, legal regulatory and application guidelines”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Low intensity transcranial electric stimulation: Safety, ethical, legal regulatory and application guidelines",
        "url": "https://doi.org/10.1016/j.clinph.2017.06.001",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-instituto-politecnico-de-lisboa-neurotechnology",
    "title": "Recommendations for Combining Brain-Computer Interface, Motor Imagery, and Virtual Reality in Upper Limb Stroke Rehabilitation: Qualitative Participatory Design Study",
    "companySlug": "instituto-politecnico-de-lisboa-neurotechnology",
    "dateLabel": "15 Oct 2025",
    "sortDate": "2025-10-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Instituto Politécnico de Lisboa reports “Recommendations for Combining Brain-Computer Interface, Motor Imagery, and Virtual Reality in Upper Limb Stroke Rehabilitation: Qualitative Participatory Design Study”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Recommendations for Combining Brain-Computer Interface, Motor Imagery, and Virtual Reality in Upper Limb Stroke Rehabilitation: Qualitative Participatory Design Study",
        "url": "https://doi.org/10.2196/71789",
        "publisher": "JMIR Publications Inc.",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-lisbon-neurotechnology",
    "title": "Wearable neurofeedback acceptance model for students’ stress and anxiety management in academic settings",
    "companySlug": "university-of-lisbon-neurotechnology",
    "dateLabel": "24 Oct 2024",
    "sortDate": "2024-10-24",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Lisbon reports “Wearable neurofeedback acceptance model for students’ stress and anxiety management in academic settings”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Wearable neurofeedback acceptance model for students’ stress and anxiety management in academic settings",
        "url": "https://doi.org/10.1371/journal.pone.0304932",
        "publisher": "Public Library of Science (PLoS)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-hse-bioelectric-interfaces",
    "title": "NFBLab—A Versatile Software for Neurofeedback and Brain-Computer Interface Research",
    "companySlug": "hse-bioelectric-interfaces",
    "dateLabel": "24 Dec 2018",
    "sortDate": "2018-12-24",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to HSE Center for Bioelectric Interfaces reports “NFBLab—A Versatile Software for Neurofeedback and Brain-Computer Interface Research”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "NFBLab—A Versatile Software for Neurofeedback and Brain-Computer Interface Research",
        "url": "https://doi.org/10.3389/fninf.2018.00100",
        "publisher": "Frontiers in Neuroinformatics",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-institute-of-cell-biophysics-neurotechnology",
    "title": "Resonance Scanning as an Efficiency Enhancer for EEG-Guided Adaptive Neurostimulation",
    "companySlug": "institute-of-cell-biophysics-neurotechnology",
    "dateLabel": "23 Feb 2023",
    "sortDate": "2023-02-23",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Institute of Cell Biophysics reports “Resonance Scanning as an Efficiency Enhancer for EEG-Guided Adaptive Neurostimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Resonance Scanning as an Efficiency Enhancer for EEG-Guided Adaptive Neurostimulation",
        "url": "https://doi.org/10.3390/life13030620",
        "publisher": "MDPI AG",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-mitsar-eeg",
    "title": "Musical auditory feedback BCI: clinical pilot study of the Encephalophone",
    "companySlug": "mitsar-eeg",
    "dateLabel": "Dec 2025",
    "sortDate": "2025-12-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Mitsar's research profile reports “Musical auditory feedback BCI: clinical pilot study of the Encephalophone”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Musical auditory feedback BCI: clinical pilot study of the Encephalophone",
        "url": "https://doi.org/10.3389/fnhum.2025.1592640",
        "publisher": "Frontiers in Human Neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-msu-neurocomputer-interfaces",
    "title": "Brain-Computer Interface Based on Generation of Visual Images",
    "companySlug": "msu-neurocomputer-interfaces",
    "dateLabel": "10 Jun 2011",
    "sortDate": "2011-06-10",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to MSU Laboratory for Neurophysiology and Neuro-Computer Interfaces reports “Brain-Computer Interface Based on Generation of Visual Images”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Brain-Computer Interface Based on Generation of Visual Images",
        "url": "https://doi.org/10.1371/journal.pone.0020674",
        "publisher": "PLoS ONE",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-institut-mihajlo-pupin-neurotechnology",
    "title": "Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation",
    "companySlug": "institut-mihajlo-pupin-neurotechnology",
    "dateLabel": "20 Jul 2024",
    "sortDate": "2024-07-20",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Institut Mihajlo Pupin reports “Towards enhanced functionality of vagus neuroprostheses through in silico optimized stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-university-of-belgrade-neurotechnology",
    "title": "Brain computer interface training with motor imagery and functional electrical stimulation for patients with severe upper limb paresis after stroke: a randomized controlled pilot trial",
    "companySlug": "university-of-belgrade-neurotechnology",
    "dateLabel": "20 Jan 2024",
    "sortDate": "2024-01-20",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Belgrade reports “Brain computer interface training with motor imagery and functional electrical stimulation for patients with severe upper limb paresis after stroke: a randomized controlled pilot trial”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Brain computer interface training with motor imagery and functional electrical stimulation for patients with severe upper limb paresis after stroke: a randomized controlled pilot trial",
        "url": "https://doi.org/10.1186/s12984-024-01304-1",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-biomedical-research-networking-center-on-neurodegenerative-diseases-neurotechnology",
    "title": "Nanoporous graphene-based thin-film microelectrodes for in vivo high-resolution neural recording and stimulation",
    "companySlug": "biomedical-research-networking-center-on-neurodegenerative-diseases-neurotechnology",
    "dateLabel": "11 Jan 2024",
    "sortDate": "2024-01-11",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Biomedical Research Networking Center on Neurodegenerative Diseases reports “Nanoporous graphene-based thin-film microelectrodes for in vivo high-resolution neural recording and stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Nanoporous graphene-based thin-film microelectrodes for in vivo high-resolution neural recording and stimulation",
        "url": "https://doi.org/10.1038/s41565-023-01570-5",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-cortivis",
    "title": "Visual percepts evoked with an intracortical 96-channel microelectrode array inserted in human occipital cortex",
    "companySlug": "cortivis",
    "dateLabel": "19 Oct 2021",
    "sortDate": "2021-10-19",
    "evidenceLevel": "E4",
    "summary": "This peer-reviewed human study reports work from the CORTIVIS clinical protocol and links the result to NCT02983370. The paper is tracked for that specifically documented relationship, not as validation of every product or performance claim.",
    "sourceLinks": [
      {
        "title": "Visual percepts evoked with an intracortical 96-channel microelectrode array inserted in human occipital cortex",
        "url": "https://doi.org/10.1172/JCI151331",
        "publisher": "Journal of Clinical Investigation",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-institucio-catalana-de-recerca-i-estudis-avancats-neurotechnology",
    "title": "An artefact-resilient wide bandwidth bidirectional graphene neural interface",
    "companySlug": "institucio-catalana-de-recerca-i-estudis-avancats-neurotechnology",
    "dateLabel": "28 May 2026",
    "sortDate": "2026-05-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Institució Catalana de Recerca i Estudis Avançats reports “An artefact-resilient wide bandwidth bidirectional graphene neural interface”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-institut-catala-de-nanociencia-i-nanotecnologia-neurotechnology",
    "title": "An artefact-resilient wide bandwidth bidirectional graphene neural interface",
    "companySlug": "institut-catala-de-nanociencia-i-nanotecnologia-neurotechnology",
    "dateLabel": "28 May 2026",
    "sortDate": "2026-05-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Institut Català de Nanociència i Nanotecnologia reports “An artefact-resilient wide bandwidth bidirectional graphene neural interface”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-institut-de-microelectronica-de-barcelona-neurotechnology",
    "title": "An artefact-resilient wide bandwidth bidirectional graphene neural interface",
    "companySlug": "institut-de-microelectronica-de-barcelona-neurotechnology",
    "dateLabel": "28 May 2026",
    "sortDate": "2026-05-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Institut de Microelectrònica de Barcelona reports “An artefact-resilient wide bandwidth bidirectional graphene neural interface”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-institut-guttmann-neurotechnology",
    "title": "Assessment of focused ultrasound stimulation to induce peripheral nerve activity and potential damage in vivo",
    "companySlug": "institut-guttmann-neurotechnology",
    "dateLabel": "28 Feb 2024",
    "sortDate": "2024-02-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Institut Guttmann reports “Assessment of focused ultrasound stimulation to induce peripheral nerve activity and potential damage in vivo”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Assessment of focused ultrasound stimulation to induce peripheral nerve activity and potential damage in vivo",
        "url": "https://doi.org/10.3389/fneur.2024.1346412",
        "publisher": "Frontiers Media SA",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-methinks",
    "title": "Abstract WP179: Initial Core Volume Assessment-based Machine Learning on Non-Contrast CT could Discriminate Outcomes According to ASPECTS score and Stroke Elapsed Time in Reperfusion Treatment Patients",
    "companySlug": "methinks",
    "dateLabel": "Feb 2025",
    "sortDate": "2025-02-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Methinks's research profile reports “Abstract WP179: Initial Core Volume Assessment-based Machine Learning on Non-Contrast CT could Discriminate Outcomes According to ASPECTS score and Stroke Elapsed Time in Reperfusion Treatment Patients”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Abstract WP179: Initial Core Volume Assessment-based Machine Learning on Non-Contrast CT could Discriminate Outcomes According to ASPECTS score and Stroke Elapsed Time in Reperfusion Treatment Patients",
        "url": "https://doi.org/10.1161/str.56.suppl_1.wp179",
        "publisher": "Ovid Technologies (Wolters Kluwer Health)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-time-is-brain",
    "title": "Prognostic Accuracy of N20 Somatosensory Potential in Patients With Acute Ischemic Stroke and Endovascular Thrombectomy",
    "companySlug": "time-is-brain",
    "dateLabel": "14 Jun 2023",
    "sortDate": "2023-06-14",
    "evidenceLevel": "E4",
    "summary": "This peer-reviewed PROMISE study evaluates the N20 biomarker that the founders identify as the basis of the BraiN20 program. The paper is tracked for that specifically documented relationship, not as validation of every product or performance claim.",
    "sourceLinks": [
      {
        "title": "Prognostic Accuracy of N20 Somatosensory Potential in Patients With Acute Ischemic Stroke and Endovascular Thrombectomy",
        "url": "https://doi.org/10.1161/SVIN.122.000735",
        "publisher": "Stroke: Vascular and Interventional Neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-universitat-autonoma-de-barcelona-neurotechnology",
    "title": "Nanoporous graphene-based thin-film microelectrodes for in vivo high-resolution neural recording and stimulation",
    "companySlug": "universitat-autonoma-de-barcelona-neurotechnology",
    "dateLabel": "11 Jan 2024",
    "sortDate": "2024-01-11",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Universitat Autònoma de Barcelona reports “Nanoporous graphene-based thin-film microelectrodes for in vivo high-resolution neural recording and stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Nanoporous graphene-based thin-film microelectrodes for in vivo high-resolution neural recording and stimulation",
        "url": "https://doi.org/10.1038/s41565-023-01570-5",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-flow-neuroscience",
    "title": "Home-based transcranial direct current stimulation treatment for major depressive disorder: a fully remote phase 2 randomized sham-controlled trial",
    "companySlug": "flow-neuroscience",
    "dateLabel": "Jan 2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Flow Neuroscience's research profile reports “Home-based transcranial direct current stimulation treatment for major depressive disorder: a fully remote phase 2 randomized sham-controlled trial”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Home-based transcranial direct current stimulation treatment for major depressive disorder: a fully remote phase 2 randomized sham-controlled trial",
        "url": "https://doi.org/10.1038/s41591-024-03305-y",
        "publisher": "Nature Medicine",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-karolinska-institutet-neurotechnology",
    "title": "Transcranial Magnetic Stimulation and Transcranial Direct Current Stimulation Across Mental Disorders",
    "companySlug": "karolinska-institutet-neurotechnology",
    "dateLabel": "22 May 2024",
    "sortDate": "2024-05-22",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Karolinska Institutet reports “Transcranial Magnetic Stimulation and Transcranial Direct Current Stimulation Across Mental Disorders”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Transcranial Magnetic Stimulation and Transcranial Direct Current Stimulation Across Mental Disorders",
        "url": "https://doi.org/10.1001/jamanetworkopen.2024.12616",
        "publisher": "American Medical Association (AMA)",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-threebrain",
    "title": "Nitric oxide refines retinal circuit architecture independently of retinal wave dynamics",
    "companySlug": "threebrain",
    "dateLabel": "26 Jun 2026",
    "sortDate": "2026-06-26",
    "evidenceLevel": "E2",
    "summary": "A publication linked from 3Brain's research profile reports “Nitric oxide refines retinal circuit architecture independently of retinal wave dynamics”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Nitric oxide refines retinal circuit architecture independently of retinal wave dynamics",
        "url": "https://doi.org/10.1038/s41420-026-03228-2",
        "publisher": "Cell Death Discovery",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-centre-hospitalier-universitaire-vaudois-neurotechnology",
    "title": "Minimizing artifact-induced false-alarms for seizure detection in wearable EEG devices with gradient-boosted tree classifiers",
    "companySlug": "centre-hospitalier-universitaire-vaudois-neurotechnology",
    "dateLabel": "5 Feb 2024",
    "sortDate": "2024-02-05",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Centre Hospitalier Universitaire Vaudois reports “Minimizing artifact-induced false-alarms for seizure detection in wearable EEG devices with gradient-boosted tree classifiers”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Minimizing artifact-induced false-alarms for seizure detection in wearable EEG devices with gradient-boosted tree classifiers",
        "url": "https://doi.org/10.1038/s41598-024-52551-0",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-finalspark",
    "title": "Open and remotely accessible Neuroplatform for research in wetware computing",
    "companySlug": "finalspark",
    "dateLabel": "2 May 2024",
    "sortDate": "2024-05-02",
    "evidenceLevel": "E2",
    "summary": "A publication linked from FinalSpark's research profile reports “Open and remotely accessible Neuroplatform for research in wetware computing”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Open and remotely accessible Neuroplatform for research in wetware computing",
        "url": "https://doi.org/10.3389/frai.2024.1376042",
        "publisher": "Frontiers in Artificial Intelligence",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-idun-technologies",
    "title": "Preliminary validation of in-ear EEG against PSG system for sleep staging",
    "companySlug": "idun-technologies",
    "dateLabel": "Dec 2022",
    "sortDate": "2022-12-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from IDUN Technologies's research profile reports “Preliminary validation of in-ear EEG against PSG system for sleep staging”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Preliminary validation of in-ear EEG against PSG system for sleep staging",
        "url": "https://doi.org/10.1016/j.sleep.2022.05.073",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-maxwell-biosystems",
    "title": "Dynamic sampling of non-stationary spontaneous activity in dissociated neuronal networks",
    "companySlug": "maxwell-biosystems",
    "dateLabel": "27 Jul 2026",
    "sortDate": "2026-07-27",
    "evidenceLevel": "E2",
    "summary": "A preprint linked from MaxWell Biosystems's research profile reports “Dynamic sampling of non-stationary spontaneous activity in dissociated neuronal networks”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Dynamic sampling of non-stationary spontaneous activity in dissociated neuronal networks",
        "url": "https://arxiv.org/abs/2607.24269",
        "publisher": "arxiv.org",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-geneva-neurotechnology",
    "title": "An Implantable Biohybrid Neural Interface Toward Synaptic Deep Brain Stimulation",
    "companySlug": "university-of-geneva-neurotechnology",
    "dateLabel": "9 Feb 2025",
    "sortDate": "2025-02-09",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Geneva reports “An Implantable Biohybrid Neural Interface Toward Synaptic Deep Brain Stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "An Implantable Biohybrid Neural Interface Toward Synaptic Deep Brain Stimulation",
        "url": "https://doi.org/10.1002/adfm.202416557",
        "publisher": "Wiley",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-lausanne-neurotechnology",
    "title": "Brain–Computer Interfaces for Communication in Patients with Disorders of Consciousness: A Gap Analysis and Scientific Roadmap",
    "companySlug": "university-of-lausanne-neurotechnology",
    "dateLabel": "29 Jan 2024",
    "sortDate": "2024-01-29",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Lausanne reports “Brain–Computer Interfaces for Communication in Patients with Disorders of Consciousness: A Gap Analysis and Scientific Roadmap”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Brain–Computer Interfaces for Communication in Patients with Disorders of Consciousness: A Gap Analysis and Scientific Roadmap",
        "url": "https://doi.org/10.1007/s12028-023-01924-w",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-zurich-neurotechnology",
    "title": "Holographic transcranial ultrasound neuromodulation enhances stimulation efficacy by cooperatively recruiting distributed brain circuits",
    "companySlug": "university-of-zurich-neurotechnology",
    "dateLabel": "7 Jul 2025",
    "sortDate": "2025-07-07",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Zurich reports “Holographic transcranial ultrasound neuromodulation enhances stimulation efficacy by cooperatively recruiting distributed brain circuits”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-xanastim",
    "title": "Immediate effects and duration of a short and single application of transcutaneous auricular vagus nerve stimulation on P300 event related potential",
    "companySlug": "xanastim",
    "dateLabel": "27 Mar 2023",
    "sortDate": "2023-03-27",
    "evidenceLevel": "E2",
    "summary": "A publication linked from XanaStim's research profile reports “Immediate effects and duration of a short and single application of transcutaneous auricular vagus nerve stimulation on P300 event related potential”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Immediate effects and duration of a short and single application of transcutaneous auricular vagus nerve stimulation on P300 event related potential",
        "url": "https://doi.org/10.3389/fnins.2023.1096865",
        "publisher": "Frontiers in Neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-itu-cognitive-systems-bci",
    "title": "A Neural Network-Based Optimal Spatial Filter Design Method for Motor Imagery Classification",
    "companySlug": "itu-cognitive-systems-bci",
    "dateLabel": "1 May 2015",
    "sortDate": "2015-05-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to ITU Cognitive Systems Laboratory reports “A Neural Network-Based Optimal Spatial Filter Design Method for Motor Imagery Classification”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A Neural Network-Based Optimal Spatial Filter Design Method for Motor Imagery Classification",
        "url": "https://doi.org/10.1371/journal.pone.0125039",
        "publisher": "PLoS ONE",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-ktu-biomedical-bci",
    "title": "A polynomial fitting and k-NN based approach for improving classification of motor imagery BCI data",
    "companySlug": "ktu-biomedical-bci",
    "dateLabel": "19 Apr 2010",
    "sortDate": "2010-04-19",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Karadeniz Technical University Biomedical Research Laboratory reports “A polynomial fitting and k-NN based approach for improving classification of motor imagery BCI data”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "A polynomial fitting and k-NN based approach for improving classification of motor imagery BCI data",
        "url": "https://doi.org/10.1016/j.patrec.2010.04.009",
        "publisher": "Pattern Recognition Letters",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-neuronic",
    "title": "Transcranial photobiomodulation prevents anxiety and depression <i>via</i> changing serotonin and nitric oxide levels in brain of depression model mice: A study of three different doses of 810 nm laser",
    "companySlug": "neuronic",
    "dateLabel": "18 Mar 2019",
    "sortDate": "2019-03-18",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Neuronic's research profile reports “Transcranial photobiomodulation prevents anxiety and depression <i>via</i> changing serotonin and nitric oxide levels in brain of depression model mice: A study of three different doses of 810 nm laser”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Transcranial photobiomodulation prevents anxiety and depression <i>via</i> changing serotonin and nitric oxide levels in brain of depression model mice: A study of three different doses of 810 nm laser",
        "url": "https://doi.org/10.1002/lsm.23082",
        "publisher": "Wiley",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-samphire-neuroscience",
    "title": "Home-Based Transcranial Direct Current Stimulation for Menstrual Pain and Premenstrual Symptoms: A Randomized Controlled Trial.",
    "companySlug": "samphire-neuroscience",
    "dateLabel": "2026",
    "sortDate": "2026-01-01",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Samphire Neuroscience's research profile reports “Home-Based Transcranial Direct Current Stimulation for Menstrual Pain and Premenstrual Symptoms: A Randomized Controlled Trial.”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Home-Based Transcranial Direct Current Stimulation for Menstrual Pain and Premenstrual Symptoms: A Randomized Controlled Trial.",
        "url": "https://doi.org/10.2147/IJWH.S564992",
        "publisher": "International journal of women's health",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-thymia",
    "title": "A multimodal Bayesian network for symptom-level depression and anxiety prediction from voice and speech data",
    "companySlug": "thymia",
    "dateLabel": "6 Feb 2026",
    "sortDate": "2026-02-06",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Thymia's research profile reports “A multimodal Bayesian network for symptom-level depression and anxiety prediction from voice and speech data”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "A multimodal Bayesian network for symptom-level depression and anxiety prediction from voice and speech data",
        "url": "https://doi.org/10.1038/s41598-025-33331-w",
        "publisher": "Scientific Reports",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-bios-health",
    "title": "Using data-driven insights from the nervous system to build neural digital therapies",
    "companySlug": "bios-health",
    "dateLabel": "11 Apr 2022",
    "sortDate": "2022-04-11",
    "evidenceLevel": "E2",
    "summary": "A publication linked from BIOS Health's research profile reports “Using data-driven insights from the nervous system to build neural digital therapies”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Using data-driven insights from the nervous system to build neural digital therapies",
        "url": "https://www.nature.com/articles/d43747-022-00127-0",
        "publisher": "Nature Publishing Group",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-cardiff-university-neurotechnology",
    "title": "Bridging Minds and Machines: The Recent Advances of Brain-Computer Interfaces in Neurological and Neurosurgical Applications",
    "companySlug": "cardiff-university-neurotechnology",
    "dateLabel": "Sept 2024",
    "sortDate": "2024-09-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Cardiff University reports “Bridging Minds and Machines: The Recent Advances of Brain-Computer Interfaces in Neurological and Neurosurgical Applications”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Bridging Minds and Machines: The Recent Advances of Brain-Computer Interfaces in Neurological and Neurosurgical Applications",
        "url": "https://doi.org/10.1016/j.wneu.2024.05.104",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-cerca-magnetics",
    "title": "Towards a 384-channel magnetoencephalography system based on optically pumped magnetometers",
    "companySlug": "cerca-magnetics",
    "dateLabel": "2025",
    "sortDate": "2025-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Cerca Magnetics's research profile reports “Towards a 384-channel magnetoencephalography system based on optically pumped magnetometers”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Towards a 384-channel magnetoencephalography system based on optically pumped magnetometers",
        "url": "https://doi.org/10.1162/imag.a.1042",
        "publisher": "MIT Press",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-coherence-neuro",
    "title": "Cancer research needs neuroscience and neuroscientists",
    "companySlug": "coherence-neuro",
    "dateLabel": "May 2025",
    "sortDate": "2025-05-01",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Coherence Neuro's research profile reports “Cancer research needs neuroscience and neuroscientists”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Cancer research needs neuroscience and neuroscientists",
        "url": "https://doi.org/10.1038/s41593-025-01925-2",
        "publisher": "Nature Neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-comind",
    "title": "Monte Carlo simulations of time-resolved blood flow index: times-of-flight beyond ∼1 ns are necessary for brain-dominated measurements",
    "companySlug": "comind",
    "dateLabel": "30 Mar 2026",
    "sortDate": "2026-03-30",
    "evidenceLevel": "E2",
    "summary": "A publication linked from CoMind's research profile reports “Monte Carlo simulations of time-resolved blood flow index: times-of-flight beyond ∼1 ns are necessary for brain-dominated measurements”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "Monte Carlo simulations of time-resolved blood flow index: times-of-flight beyond ∼1 ns are necessary for brain-dominated measurements",
        "url": "https://doi.org/10.1117/1.nph.13.2.025003",
        "publisher": "SPIE-Intl Soc Optical Eng",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-cumulus-neuroscience",
    "title": "A brief visual evoked potential (VEP) modulation assessment of experience-dependent plasticity recorded via wireless dry-EEG headset in Phase 1 clinical units",
    "companySlug": "cumulus-neuroscience",
    "dateLabel": "6 Jan 2026",
    "sortDate": "2026-01-06",
    "evidenceLevel": "E4",
    "summary": "A publication linked from Cumulus Neuroscience's research profile reports “A brief visual evoked potential (VEP) modulation assessment of experience-dependent plasticity recorded via wireless dry-EEG headset in Phase 1 clinical units”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "A brief visual evoked potential (VEP) modulation assessment of experience-dependent plasticity recorded via wireless dry-EEG headset in Phase 1 clinical units",
        "url": "https://doi.org/10.1038/s41598-025-29950-y",
        "publisher": "Scientific Reports",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-imperial-neural-interfaces",
    "title": "Review of the BCI Competition IV",
    "companySlug": "imperial-neural-interfaces",
    "dateLabel": "1 Jan 2012",
    "sortDate": "2012-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Imperial College London Neural Interfaces Research reports “Review of the BCI Competition IV”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Review of the BCI Competition IV",
        "url": "https://doi.org/10.3389/fnins.2012.00055",
        "publisher": "Frontiers in Neuroscience",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-king-s-college-london-neurotechnology",
    "title": "Brain–Computer Interfaces for Communication in Patients with Disorders of Consciousness: A Gap Analysis and Scientific Roadmap",
    "companySlug": "king-s-college-london-neurotechnology",
    "dateLabel": "29 Jan 2024",
    "sortDate": "2024-01-29",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to King's College London reports “Brain–Computer Interfaces for Communication in Patients with Disorders of Consciousness: A Gap Analysis and Scientific Roadmap”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Brain–Computer Interfaces for Communication in Patients with Disorders of Consciousness: A Gap Analysis and Scientific Roadmap",
        "url": "https://doi.org/10.1007/s12028-023-01924-w",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-medical-research-council-neurotechnology",
    "title": "Biophysical effects and neuromodulatory dose of transcranial ultrasonic stimulation",
    "companySlug": "medical-research-council-neurotechnology",
    "dateLabel": "May 2025",
    "sortDate": "2025-05-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to Medical Research Council reports “Biophysical effects and neuromodulatory dose of transcranial ultrasonic stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Biophysical effects and neuromodulatory dose of transcranial ultrasonic stimulation",
        "url": "https://doi.org/10.1016/j.brs.2025.02.019",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-national-hospital-for-neurology-and-neurosurgery-neurotechnology",
    "title": "An artefact-resilient wide bandwidth bidirectional graphene neural interface",
    "companySlug": "national-hospital-for-neurology-and-neurosurgery-neurotechnology",
    "dateLabel": "28 May 2026",
    "sortDate": "2026-05-28",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to National Hospital for Neurology and Neurosurgery reports “An artefact-resilient wide bandwidth bidirectional graphene neural interface”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-newcastle-university-neurotechnology",
    "title": "Connectivity-guided intermittent theta burst versus repetitive transcranial magnetic stimulation for treatment-resistant depression: a randomized controlled trial",
    "companySlug": "newcastle-university-neurotechnology",
    "dateLabel": "16 Jan 2024",
    "sortDate": "2024-01-16",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to Newcastle University reports “Connectivity-guided intermittent theta burst versus repetitive transcranial magnetic stimulation for treatment-resistant depression: a randomized controlled trial”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Connectivity-guided intermittent theta burst versus repetitive transcranial magnetic stimulation for treatment-resistant depression: a randomized controlled trial",
        "url": "https://doi.org/10.1038/s41591-023-02764-z",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-nia-therapeutics",
    "title": "A wireless, 60-channel, AI-enabled neurostimulation platform",
    "companySlug": "nia-therapeutics",
    "dateLabel": "Jan 2026",
    "sortDate": "2026-01-01",
    "evidenceLevel": "E2",
    "summary": "A publication linked from Nia Therapeutics's research profile reports “A wireless, 60-channel, AI-enabled neurostimulation platform”. The paper is tracked as evidence for the specific reported work, not for every product or performance claim made by the organization.",
    "sourceLinks": [
      {
        "title": "A wireless, 60-channel, AI-enabled neurostimulation platform",
        "url": "https://doi.org/10.1016/j.brs.2025.103013",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-ucl-neurotechnology",
    "title": "Adaptive deep brain stimulation in advanced Parkinson disease",
    "companySlug": "ucl-neurotechnology",
    "dateLabel": "12 Jul 2013",
    "sortDate": "2013-07-12",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to UCL Neurotechnology Research reports “Adaptive deep brain stimulation in advanced Parkinson disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Adaptive deep brain stimulation in advanced Parkinson disease",
        "url": "https://doi.org/10.1002/ana.23951",
        "publisher": "Annals of Neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-cambridge-neural-interface",
    "title": "Attentional Selection in a Cocktail Party Environment Can Be Decoded from Single-Trial EEG",
    "companySlug": "cambridge-neural-interface",
    "dateLabel": "15 Jan 2014",
    "sortDate": "2014-01-15",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Cambridge Neural Interface Research reports “Attentional Selection in a Cocktail Party Environment Can Be Decoded from Single-Trial EEG”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Attentional Selection in a Cocktail Party Environment Can Be Decoded from Single-Trial EEG",
        "url": "https://doi.org/10.1093/cercor/bht355",
        "publisher": "Cerebral Cortex",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-glasgow-bci",
    "title": "Measures of resting state EEG rhythms for clinical trials in Alzheimer's disease: Recommendations of an expert panel",
    "companySlug": "glasgow-bci",
    "dateLabel": "15 Apr 2021",
    "sortDate": "2021-04-15",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Glasgow BCI Research reports “Measures of resting state EEG rhythms for clinical trials in Alzheimer's disease: Recommendations of an expert panel”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Measures of resting state EEG rhythms for clinical trials in Alzheimer's disease: Recommendations of an expert panel",
        "url": "https://doi.org/10.1002/alz.12311",
        "publisher": "Alzheimer s & Dementia",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-liverpool-neurotechnology",
    "title": "Brain computer interfaces for cognitive enhancement in older people - challenges and applications: a systematic review",
    "companySlug": "university-of-liverpool-neurotechnology",
    "dateLabel": "16 Jan 2025",
    "sortDate": "2025-01-16",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Liverpool reports “Brain computer interfaces for cognitive enhancement in older people - challenges and applications: a systematic review”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Brain computer interfaces for cognitive enhancement in older people - challenges and applications: a systematic review",
        "url": "https://doi.org/10.1186/s12877-025-05676-4",
        "publisher": "Springer Science and Business Media LLC",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-nottingham-neurotechnology",
    "title": "Delay- and Pressure-Dependent Neuromodulatory Effects of Transcranial Ultrasound Stimulation",
    "companySlug": "university-of-nottingham-neurotechnology",
    "dateLabel": "Apr 2025",
    "sortDate": "2025-04-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Nottingham reports “Delay- and Pressure-Dependent Neuromodulatory Effects of Transcranial Ultrasound Stimulation”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Delay- and Pressure-Dependent Neuromodulatory Effects of Transcranial Ultrasound Stimulation",
        "url": "https://doi.org/10.1016/j.neurom.2025.01.004",
        "publisher": "Elsevier BV",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-oxford-neural-engineering",
    "title": "Adaptive deep brain stimulation in advanced Parkinson disease",
    "companySlug": "oxford-neural-engineering",
    "dateLabel": "12 Jul 2013",
    "sortDate": "2013-07-12",
    "evidenceLevel": "E4",
    "summary": "A publication with author affiliation to University of Oxford Neural Engineering Research reports “Adaptive deep brain stimulation in advanced Parkinson disease”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Adaptive deep brain stimulation in advanced Parkinson disease",
        "url": "https://doi.org/10.1002/ana.23951",
        "publisher": "Annals of Neurology",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-paper-university-of-plymouth-neurotechnology",
    "title": "A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium",
    "companySlug": "university-of-plymouth-neurotechnology",
    "dateLabel": "Mar 2025",
    "sortDate": "2025-03-01",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Plymouth reports “A practical guide to transcranial ultrasonic stimulation from the IFCN-endorsed ITRUSST consortium”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
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
    "id": "europe-paper-warwick-neurotechnology",
    "title": "Channel selection and classification of electroencephalogram signals: An artificial neural network and genetic algorithm-based approach",
    "companySlug": "warwick-neurotechnology",
    "dateLabel": "12 Apr 2012",
    "sortDate": "2012-04-12",
    "evidenceLevel": "E2",
    "summary": "A publication with author affiliation to University of Warwick Neurotechnology Research reports “Channel selection and classification of electroencephalogram signals: An artificial neural network and genetic algorithm-based approach”. The affiliation supports this publication link; it does not transfer the paper's findings to every activity of the parent institution.",
    "sourceLinks": [
      {
        "title": "Channel selection and classification of electroencephalogram signals: An artificial neural network and genetic algorithm-based approach",
        "url": "https://doi.org/10.1016/j.artmed.2012.02.001",
        "publisher": "Artificial Intelligence in Medicine",
        "sourceType": "paper",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];

export const europeEvidenceTrials: Trial[] = [
  {
    "id": "europe-trial-aurimod-nct07628179",
    "title": "SENECA - Smart Therapies for Chronic Pain",
    "companySlug": "aurimod",
    "status": "not yet recruiting",
    "condition": "Chronic Low Back Pain (CLBP)",
    "targetFunction": "wearable auricular vagus-nerve stimulation for chronic pain.",
    "deviceProduct": "VIVO 2nd GEN; Standard-of-Care Multimodal Pain Therapy",
    "locations": [
      "Klinikum Klagenfurt am Wörthersee, Klagenfurt, Carinthia, Austria"
    ],
    "endpoints": [
      "Oswestry Disability Index (ODI)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07628179 study record",
        "url": "https://clinicaltrials.gov/study/NCT07628179",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-gtec-medical-engineering-nct06940635",
    "title": "Exploratory Study on the Potential Cross-System Effects of BCI-FES Hand Therapy on Dysphagia and Aphasia in Chronic Stroke Patients",
    "companySlug": "gtec-medical-engineering",
    "status": "recruiting",
    "condition": "Ischaemic Stroke; Hemorrhagic Stroke",
    "targetFunction": "Non-invasive and invasive BCI research, communication, and neurorehabilitation",
    "deviceProduct": "closed-loop BCI-FES device",
    "locations": [
      "Department for Neurology, Medical University of Innsbruck, Innsbruck, Tyrol, Austria"
    ],
    "endpoints": [
      "Change in Gugging Swallowing Screen (GUSS)",
      "Change in Bielefeld Aphasia Screening Reha (BIAS-R)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06940635 study record",
        "url": "https://clinicaltrials.gov/study/NCT06940635",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-syntropic-nct07111390",
    "title": "Feasibility of Home-Based Intermittent 60Hz Light Therapy for Major Depressive Disorder (MDD)",
    "companySlug": "syntropic",
    "status": "recruiting",
    "condition": "Depression; MDD; Major Depressive Disorder; Major Depressive Episode",
    "targetFunction": "Psychiatry technology for patients",
    "deviceProduct": "60Hz Intermittent Light Therapy; Sham Light Therapy",
    "locations": [
      "NYU Langone Health, New York, New York, United States"
    ],
    "endpoints": [
      "Proportion of Participants who Complete all Scheduled Sessions",
      "Average Percentage of Completed Sessions",
      "Proportion of Participants who Discontinue due to Adverse Effects"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07111390 study record",
        "url": "https://clinicaltrials.gov/study/NCT07111390",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-tyromotion-nct06073522",
    "title": "Validation of AI for Personalized Assessment and Rehabilitation of Upper Limb in Children With Unilateral Cerebral Palsy",
    "companySlug": "tyromotion",
    "status": "not yet recruiting",
    "condition": "Unilateral Cerebral Palsy",
    "targetFunction": "robotic upper-limb rehabilitation.",
    "deviceProduct": "Artificial Intelligence for combining multi-domain data acquisition",
    "locations": [
      "IRCCS Fondazione Stella Maris, Pisa, Italy",
      "Universidad de Castilla - La Mancha, Toledo, Spain"
    ],
    "endpoints": [
      "score of modified Ashworth Scale (MAS)",
      "score of grip strenght by means of Jamar dynamometer Grip strength will be assessed with the Jamar dynamometer",
      "score of mirror movements",
      "score of Stereognosis (tactile object identification)",
      "score of Two point discrimination test",
      "score of Assisting Hand Assessment"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06073522 study record",
        "url": "https://clinicaltrials.gov/study/NCT06073522",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-cefaly-nct06788977",
    "title": "External Trigeminal Nerve Stimulation for Migraine Treatment in Pregnancy",
    "companySlug": "cefaly",
    "status": "recruiting",
    "condition": "Pregnancy; Migraine; Headache; Postpartum",
    "targetFunction": "Migraine prevention and acute treatment neuromodulation",
    "deviceProduct": "external Trigeminal Nerve Stimulation",
    "locations": [
      "https://public.smart-trial.co/#/public/649d77f0e8f8d0fb993d0c61/6626f6a04f0a3c7dd0860e14/662726d84f0a3c7dd08aeaa0/signup?lang=en-us&enforceLanguage=true, Darien, Connecticut, United States"
    ],
    "endpoints": [
      "Rate of miscarriage per trimester",
      "Postpartum Bonding according to the Maternal-to-Infant Bonding Scale"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06788977 study record",
        "url": "https://clinicaltrials.gov/study/NCT06788977",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-icometrix-nct06280755",
    "title": "Clinical Impact Through AI-assisted MS Care - A Retrospective Multi-center Observational Study.",
    "companySlug": "icometrix",
    "status": "recruiting",
    "condition": "Multiple Sclerosis; NMO Spectrum Disorder; Myelin Oligodendrocyte Glycoprotein Antibody-associated Disease; Radiologically Isolated Syndrome",
    "targetFunction": "Multi-indication technology for clinicians",
    "deviceProduct": "Software",
    "locations": [
      "General University Hospital Prague, Prague, Praha 2, Czechia",
      "Katholisches Klinikum Bochum - St. Joseph-Hospital, Bochum, Bochum, Germany",
      "ERC Charité - Universitätsmedizin Berlin, Berlin, State of Berlin, Germany"
    ],
    "endpoints": [
      "The number of patients from each institution who have contributed data to the database.",
      "The number of patients from each institution whose data was mapped to the common data model of the harmonised database.",
      "The number of patients from the control arms of clinical trials who have contributed data to the database.",
      "The data completeness of each variable in the harmonised database."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06280755 study record",
        "url": "https://clinicaltrials.gov/study/NCT06280755",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-nyxoah-nct07331285",
    "title": "Bi-lateral HGN Therapy in Real-World Patients -Post Approval Research Investigation",
    "companySlug": "nyxoah",
    "status": "recruiting",
    "condition": "Obstructive Sleep Apnea",
    "targetFunction": "Sleep-apnea treatment through peripheral-nerve stimulation",
    "deviceProduct": "This is a single arm study, all consented and eligible subjects will be implanted with the Genio® System 2.1",
    "locations": [
      "PharmaDev Clinical Research Institute, LLC, Miami, Florida, United States",
      "Nyxoah, Inc, Summit, New Jersey, United States"
    ],
    "endpoints": [
      "Change in Apnea Hypopnea Index (AHI4%)",
      "Change in Oxyhemoglobin Desaturation Index (ODI4%)",
      "Device related SAEs",
      "Device-related and procedure-related SAEs"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07331285 study record",
        "url": "https://clinicaltrials.gov/study/NCT07331285",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-synergia-medical-nct06340802",
    "title": "A First in hUman Study for Resistant Epilepsy With the Vagus Nerve stimulatiOn Device by syneRgia medicAl",
    "companySlug": "synergia-medical",
    "status": "active not recruiting",
    "condition": "Drug Resistant Epilepsy",
    "targetFunction": "Epilepsy technology for patients",
    "deviceProduct": "VNS Treatment",
    "locations": [
      "Cliniques Universitaires St.-Luc, Brussels, Belgium",
      "UZ GENT (Universitair Ziekenhuis Gent), Ghent, Belgium",
      "Universitätsklinikum Freiburg, Freiburg im Breisgau, Germany"
    ],
    "endpoints": [
      "Treatment emergent adverse events",
      "Procedure and/or device related adverse events"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06340802 study record",
        "url": "https://clinicaltrials.gov/study/NCT06340802",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-optoceutics-nct05680220",
    "title": "40 Hz Light Neurostimulation for Patients With Depression (FELIX)",
    "companySlug": "optoceutics",
    "status": "recruiting",
    "condition": "Major Depressive Disorder; Treatment Resistant Depression",
    "targetFunction": "40 Hz light-and-sound headset being studied for brain health.",
    "deviceProduct": "Neurostimulation System (NSS): Active Setting; Neurostimulation System (NSS): Sham Setting",
    "locations": [
      "Mental Health Centre Copenhagen, Copenhagen, Denmark, Denmark"
    ],
    "endpoints": [
      "Depression severity measured by Hamilton Depression Rating sub-scale (HAM-D6)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05680220 study record",
        "url": "https://clinicaltrials.gov/study/NCT05680220",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-uneeg-medical-nct03586310",
    "title": "Evaluation of the Ear-EEG System for Sleep Monitoring in Healthy Subjects",
    "companySlug": "uneeg-medical",
    "status": "completed",
    "condition": "Sleep Monitoring",
    "targetFunction": "Epilepsy technology for clinicians",
    "deviceProduct": "ear-EEG",
    "locations": [
      "Aarhus University, Aarhus, Denmark"
    ],
    "endpoints": [
      "Cohens kappa"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT03586310 study record",
        "url": "https://clinicaltrials.gov/study/NCT03586310",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neuro-event-labs-nct06705439",
    "title": "A Study of Detection of Paroxysmal Events Utilizing Computer Vision and Machine Learning (USF)",
    "companySlug": "neuro-event-labs",
    "status": "completed",
    "condition": "Epilepsy",
    "targetFunction": "Epilepsy technology for clinicians",
    "deviceProduct": "Nelli",
    "locations": [
      "Tampa General Hospital, Tampa, Florida, United States"
    ],
    "endpoints": [
      "Sensitivity of a seizure detection system"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06705439 study record",
        "url": "https://clinicaltrials.gov/study/NCT06705439",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-nexstim-nct05549453",
    "title": "Use of Nexstim SNBT System",
    "companySlug": "nexstim",
    "status": "completed",
    "condition": "Usability of the Graphical User Interface of the Device for Its Intended Use",
    "targetFunction": "Non-invasive functional brain mapping and therapeutic stimulation",
    "deviceProduct": "Nexstim SNBT use",
    "locations": [
      "Nexstim Plc, Helsinki, Uusimaa, Finland"
    ],
    "endpoints": [
      "Assessment of usability of the graphical user interface for use of the device in its intended use"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05549453 study record",
        "url": "https://clinicaltrials.gov/study/NCT05549453",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-sooma-medical-nct06976697",
    "title": "Home-Based tDCS Treatment Of Major Depressive Disorder",
    "companySlug": "sooma-medical",
    "status": "recruiting",
    "condition": "Major Depressive Disorder (MDD)",
    "targetFunction": "Prescription neuromodulation for depression and related conditions",
    "deviceProduct": "Transcranial direct current stimulation; Sham transcranial direct current stimulation",
    "locations": [
      "Lindus Health (virtual study site), Boston, Massachusetts, United States"
    ],
    "endpoints": [
      "MADRS: change from baseline"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06976697 study record",
        "url": "https://clinicaltrials.gov/study/NCT06976697",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-bioserenity-nct03725462",
    "title": "Evaluation of Electrophysiological Signal Measured by Smart Textile CE-marked",
    "companySlug": "bioserenity",
    "status": "completed",
    "condition": "Healthy",
    "targetFunction": "Remote EEG acquisition, diagnostics, and clinical monitoring",
    "deviceProduct": "Cardioskin; Neuronaute",
    "locations": [
      "ICM, Paris, France"
    ],
    "endpoints": [
      "Sensor quality validation"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT03725462 study record",
        "url": "https://clinicaltrials.gov/study/NCT03725462",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-carthera-nct05902169",
    "title": "Sonocloud-9 in Association With Carboplatin Versus Standard-of-Care Chemotherapies (CCNU or TMZ) in Recurrent GBM",
    "companySlug": "carthera",
    "status": "recruiting",
    "condition": "Glioblastoma; Recurrent Glioblastoma; GBM",
    "targetFunction": "Drug-delivery support for brain tumors and neurological conditions",
    "deviceProduct": "SonoCloud-9 (SC9); Carboplatin; Lomustine; Temozolomide",
    "locations": [
      "Mayo Clinic Arizona, Phoenix, Arizona, United States",
      "University of California, San Francisco, San Francisco, California, United States",
      "UCHealth, Aurora, Colorado, United States",
      "Mayo Clinic of Jacksonville Florida, Jacksonville, Florida, United States",
      "Miami Cancer Institute, Miami, Florida, United States",
      "Moffitt Cancer Center, Tampa, Florida, United States",
      "Winship Cancer Institute at Emory University, Atlanta, Georgia, United States",
      "Northwestern University, Chicago, Illinois, United States"
    ],
    "endpoints": [
      "Overall survival (OS)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05902169 study record",
        "url": "https://clinicaltrials.gov/study/NCT05902169",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-dixi-medical-nct06105645",
    "title": "Contribution of Fast-ripples to the Improvement of the Neurosurgical Management of Drug-refractory Epilepsy",
    "companySlug": "dixi-medical",
    "status": "recruiting",
    "condition": "Epilepsy",
    "targetFunction": "depth electrodes for epilepsy.",
    "deviceProduct": "DIXI Medical Microdeep® Micro- Macro Depth electrodes; Standard electrodes",
    "locations": [
      "CHU Amiens Picardie, Amiens, France",
      "University hospital of Bordeaux, Bordeaux, France",
      "University hospital of Grenoble Alpes, La Tronche, France",
      "APHP Hôpital Bicêtre, Le Kremlin-Bicêtre, France",
      "CHU de Lille, Lille, France",
      "Hospices Civils de Lyon, Lyon, France",
      "CHRU de Nancy, Nancy, France",
      "Fondation Adolphe de Rothschild, Paris, France"
    ],
    "endpoints": [
      "Contribution of fast-ripples information on freedom seizures"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06105645 study record",
        "url": "https://clinicaltrials.gov/study/NCT06105645",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-naox-technologies-nct06366009",
    "title": "Assessment of Patients With Drug-resistant Temporal Lobe Epilepsy With EEG Extended With Intra-auricular Electrodes",
    "companySlug": "naox-technologies",
    "status": "unknown",
    "condition": "Epilepsy; Focal Epilepsy; Drug Resistant Epilepsy",
    "targetFunction": "Sleep technology for mixed",
    "deviceProduct": "NaoX in-ear EEG system",
    "locations": [
      "Kliniki Neurochirurgii CSK UCK WUM, Warsaw, Poland"
    ],
    "endpoints": [
      "determination of the starting point of focal temporal epileptic seizures"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06366009 study record",
        "url": "https://clinicaltrials.gov/study/NCT06366009",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neurinnov-nct07058506",
    "title": "Control Interfaces for Operating Assistive Devices",
    "companySlug": "neurinnov",
    "status": "recruiting",
    "condition": "Tetraplegia",
    "targetFunction": "Paralysis/motor technology for patients",
    "deviceProduct": "Comparison of 5 interfaces used to capture user intent to operate a neuroprosthesis",
    "locations": [
      "Rehabilitation Center Bouffard-Vercelli USSAP, Perpignan, France"
    ],
    "endpoints": [
      "Efficacy indicators"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07058506 study record",
        "url": "https://clinicaltrials.gov/study/NCT07058506",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neurosoft-bioelectronics-nct06205160",
    "title": "Evaluation of New Flexible High-density Intra-operative ECoG Electrodes for Epilepsy Surgery. ( EpiGrid )",
    "companySlug": "neurosoft-bioelectronics",
    "status": "recruiting",
    "condition": "Focal Epilepsy; Intraoperative Monitoring",
    "targetFunction": "High-resolution neural recording for epilepsy, neuroprosthetics, and BCI research",
    "deviceProduct": "SOFT ECoG subdural grid electrode",
    "locations": [
      "University Medical Center (UMC) Utrecht, Utrecht, Netherlands"
    ],
    "endpoints": [
      "Background SNR pre-resection recording"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06205160 study record",
        "url": "https://clinicaltrials.gov/study/NCT06205160",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-quantalx-neuroscience-nct06963775",
    "title": "Assessment of Traumatic Brain Injury Using Transcranial Magnetic Stimulated Evoked Potentials",
    "companySlug": "quantalx-neuroscience",
    "status": "not yet recruiting",
    "condition": "Traumatic Brain Injury",
    "targetFunction": "Objective cognitive-function assessment for neurological disease and clinical trials",
    "deviceProduct": "Delphi-MD device (QuantalX Neuroscience Ltd., Saba Israel)",
    "locations": [
      "University of Pennsylvania, Philadelphia, Pennsylvania, United States"
    ],
    "endpoints": [
      "1. Differentiate between healthy controls and TBI participants in measured outputs of the DELPHI-MD device (WFA, STP, EPD, LPD, and Connectivity)",
      "2. Correlate DELPHI-MD outputs with neural deficits identified through patient reported and clinician reported outcome measures"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06963775 study record",
        "url": "https://clinicaltrials.gov/study/NCT06963775",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-resolve-stroke-nct07324421",
    "title": "Comparison of Ultrasound Cerebral Perfusion Imaging With Routine Perfusion CT",
    "companySlug": "resolve-stroke",
    "status": "recruiting",
    "condition": "Neuro ICU; Sub Arachnoid Hemorrhage; Neurological Complication; Cerebral Ischemia",
    "targetFunction": "Stroke technology for clinicians",
    "deviceProduct": "Ultrasound contrast agent (Contrast-enhanced ultrasound)",
    "locations": [
      "Centre Hospitalo-Universitaire Gui de Chauliac, Montpellier, Herault, France"
    ],
    "endpoints": [
      "Performance of SYLVER system by determining the concordance with CT for principal vascular network localization and perfusion parameters."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07324421 study record",
        "url": "https://clinicaltrials.gov/study/NCT07324421",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-sensome-nct04993079",
    "title": "Clotild® Smart Guidewire System (CSGS) Evaluation in EndovascUlar Thrombectomy Procedure",
    "companySlug": "sensome",
    "status": "completed",
    "condition": "Stroke",
    "targetFunction": "Stroke technology for clinicians",
    "deviceProduct": "Clotild® Smart Guidewire System (CSGS)",
    "locations": [
      "Liverpool Hospital, Liverpool, New South Wales, Australia",
      "Gold Coast University Hospital, Southport, Queensland, Australia",
      "CHU Limoges, Limoges, France"
    ],
    "endpoints": [
      "The Proportion of Patients Having Intracranial Vessel Perforation and / or Dissection Due to Clotild® Usage at the Site of Usage in Intracranial Vessels",
      "The Ability to Perform Binary Classification of Individual Electrophysiological Parameter Measurements by Distinguishing Local Regions With Substantial Versus Negligible RBC Content in the Occlusion"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04993079 study record",
        "url": "https://clinicaltrials.gov/study/NCT04993079",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-wandercraft-nct07536386",
    "title": "Self-balancing Personal Exoskeleton for SCI (WIP)",
    "companySlug": "wandercraft",
    "status": "recruiting",
    "condition": "Spinal Cord Injuries; Paraplegia and Tetraplegia",
    "targetFunction": "Mobility assistance and gait rehabilitation after neurological injury",
    "deviceProduct": "Hands-free exoskeleton",
    "locations": [
      "Wandercraft, Paris, France"
    ],
    "endpoints": [
      "Safety of the device for its intended use and user population."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07536386 study record",
        "url": "https://clinicaltrials.gov/study/NCT07536386",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-ceregate-nct05292794",
    "title": "Use of CereGate Therapy for Freezing of Gait in PD",
    "companySlug": "ceregate",
    "status": "recruiting",
    "condition": "Parkinson Disease; Freezing of Gait; Deep Brain Stimulation",
    "targetFunction": "Parkinson's and neurological symptom control through adaptive stimulation software",
    "deviceProduct": "CereGate Software; BSN cDBS Programmer; BSN Burst Programmer",
    "locations": [
      "Kaiser Permanente, KPNC Comprehensive Movement Disorders Program, Redwood City, California, United States",
      "University of Colorado Anschutz Medical Campus, Aurora, Colorado, United States",
      "University of Miami, Miami, Florida, United States",
      "Northwestern University, Chicago, Illinois, United States",
      "Wake Forest University, Winston-Salem, North Carolina, United States",
      "Vanderbilt University Medical Center, Nashville, Tennessee, United States",
      "University of Washington, Seattle, Washington, United States"
    ],
    "endpoints": [
      "Primary Efficacy Objective"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05292794 study record",
        "url": "https://clinicaltrials.gov/study/NCT05292794",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-cortec-nct06898138",
    "title": "Acute Stimulation and Modulation of Stereotyped High-Frequency Oscillations",
    "companySlug": "cortec",
    "status": "not yet recruiting",
    "condition": "Epilepsy",
    "targetFunction": "Neural recording/stimulation infrastructure for rehabilitation and BCI research",
    "deviceProduct": "Brain Interchange System",
    "locations": [
      "Mayo Clinic, Rochester, Minnesota, United States",
      "Baylor College of Medicine, Houston, Texas, United States"
    ],
    "endpoints": [
      "Feasibility of Detection of Stereotyped HFOs",
      "Feasibility of Delivering Closed-Loop Stimulation"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06898138 study record",
        "url": "https://clinicaltrials.gov/study/NCT06898138",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neurocare-group-nct07227103",
    "title": "A Randomized, Double-Blind Controlled Comparison of NRX-101 vs. Placebo for Adults Being Treated With Robotic Transcranial Magnetic Stimulation for Treatment Resistant Depression: The SPARC-TMS Trial",
    "companySlug": "neurocare-group",
    "status": "not yet recruiting",
    "condition": "Treatment Resistant Depression; Treatment Resistant Depression (TRD)",
    "targetFunction": "Personalized mental-health assessment and neuromodulation support",
    "deviceProduct": "Neuronavigated robotic-enabled TMS; NRX-101; Sham TMS; Oral Placebo",
    "locations": [
      "Cohen and Associates, Sarasota, Florida, United States",
      "HOPE Accelerated Care, West Palm Beach, Florida, United States",
      "Harvard Mclean Hospital, Belmont, Massachusetts, United States"
    ],
    "endpoints": [
      "MADRS Depression",
      "CGI-SS Suicidality"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07227103 study record",
        "url": "https://clinicaltrials.gov/study/NCT07227103",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-capri-medical-nct05914948",
    "title": "Minimally Invasive Electrical Stimulation Of The Nerve Hypoglossal for the Treatment of Obstructive Sleep Apnea",
    "companySlug": "capri-medical",
    "status": "unknown",
    "condition": "Obstructive Sleep Apnea",
    "targetFunction": "Minimally invasive pain neuromodulation",
    "deviceProduct": "Medtronic 8-contact Vectris subcompact or compact electrode.",
    "locations": [
      "Clínica de Otorrinolaringología de Antioquia (ORLANT), Medellín, Antioquia, Colombia"
    ],
    "endpoints": [
      "Apnea-Hypopnea Index (AHI)",
      "Oxygen Desaturation Index (ODI)",
      "Security"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05914948 study record",
        "url": "https://clinicaltrials.gov/study/NCT05914948",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-mainstay-medical-nct04327817",
    "title": "Multifidus PET Scan Study",
    "companySlug": "mainstay-medical",
    "status": "completed",
    "condition": "Low Back Pain",
    "targetFunction": "Chronic mechanical back-pain treatment through neuromodulation",
    "deviceProduct": "Multifidus stimulator",
    "locations": [
      "Barts Health NHS Trust, London, United Kingdom"
    ],
    "endpoints": [
      "Low Back Pain Visual Analog Scale (VAS)",
      "Low Back Pain Visual Analog Scale (VAS)",
      "Low Back Pain Visual Analog Scale (VAS)",
      "Low Back Pain Visual Analog Scale (VAS)",
      "Low Back Pain Visual Analog Scale (VAS)",
      "Oswestry Disability Index (ODI)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04327817 study record",
        "url": "https://clinicaltrials.gov/study/NCT04327817",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neurobell-nct07508670",
    "title": "An Observational Study of the NeuroBell EEG Monitor",
    "companySlug": "neurobell",
    "status": "completed",
    "condition": "EEG; Neonatology; Seizure; Neurology",
    "targetFunction": "Epilepsy technology for clinicians",
    "deviceProduct": "NeuroBell EEG Monitor",
    "locations": [
      "University College Cork, Cork, Ireland"
    ],
    "endpoints": [
      "Evaluation of EEG signals from investigational device compared with standard of care EEG device"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07508670 study record",
        "url": "https://clinicaltrials.gov/study/NCT07508670",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neuromod-devices-nct05518682",
    "title": "Assessment of Bimodal Stimulation Device Compliance and Satisfaction in Individuals With Tinnitus",
    "companySlug": "neuromod-devices",
    "status": "completed",
    "condition": "Tinnitus",
    "targetFunction": "Tinnitus treatment through prescribed non-invasive neuromodulation",
    "deviceProduct": "Lenire bimodal stimulation device",
    "locations": [
      "University of Minnesota - TESSLab/PWB, Minneapolis, Minnesota, United States"
    ],
    "endpoints": [
      "Compliance rate after 12 weeks of bimodal stimulation"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05518682 study record",
        "url": "https://clinicaltrials.gov/study/NCT05518682",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-newronika-nct06891781",
    "title": "Investigating Adaptive Deep Brain Stimulation in Parkinson's Disease Management",
    "companySlug": "newronika",
    "status": "not yet recruiting",
    "condition": "Parkinson Disease, Idiopathic",
    "targetFunction": "Closed-loop stimulation for Parkinson's disease and neurological conditions",
    "deviceProduct": "Deep Brain Stimulation",
    "locations": [
      "No locations listed in the cached registry fields"
    ],
    "endpoints": [
      "Improvement in Good On Time (GOT)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06891781 study record",
        "url": "https://clinicaltrials.gov/study/NCT06891781",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-salvia-bioelectronics-nct07113470",
    "title": "Response to Combined Trigeminal and Occipital Nerve Stimulation for the Preventive Treatment in Chronic Cluster Headache",
    "companySlug": "salvia-bioelectronics",
    "status": "recruiting",
    "condition": "Chronic Cluster Headache",
    "targetFunction": "Neuromodulation therapy for chronic migraine",
    "deviceProduct": "The Salvia PRIMUS implantable neurostimulator System",
    "locations": [
      "LUMC Leids Universitair Medisch Centrum, Leiden, Netherlands"
    ],
    "endpoints": [
      "Safety Assessment"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07113470 study record",
        "url": "https://clinicaltrials.gov/study/NCT07113470",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-able-human-motion-nct07550699",
    "title": "Clinical Investigation to Validate the Safety and Performance of Integrating Functional Electrical Stimulation Into the ABLE Exoskeleton",
    "companySlug": "able-human-motion",
    "status": "recruiting",
    "condition": "Acquired Brain Injury (Including Stroke); Spinal Cord Injury; Multiple Sclerosis",
    "targetFunction": "portable exoskeleton.",
    "deviceProduct": "ABLE Exoskeleton with Functional Electrical Stimulation (ABLE FES)",
    "locations": [
      "therapy2people GmbH, Vienna, State of Vienna, Austria"
    ],
    "endpoints": [
      "Number and type of device-related Adverse Events",
      "Time taken to don/doff the device",
      "Number of steps walked",
      "Distance walked",
      "Time spent upright and time spent walking",
      "Number of therapists assisting the session"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07550699 study record",
        "url": "https://clinicaltrials.gov/study/NCT07550699",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-bitbrain-nct06993207",
    "title": "HOme-based Brain Monitoring With a GARment-EEG to Study Cognitive Decline in the Aging Population",
    "companySlug": "bitbrain",
    "status": "recruiting",
    "condition": "Dementia; Mild Cognitive Impairment; Dementia Alzheimers; Dementia, Mixed",
    "targetFunction": "BCI communication/control research, motor rehabilitation, neuroprosthesis integration, passive BCI, neurofeedback, and brain-to-vehicle research",
    "deviceProduct": "Home Lab",
    "locations": [
      "Bitbrain, Zaragoza, Zaragoza, Spain"
    ],
    "endpoints": [
      "Validation of HoGar"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06993207 study record",
        "url": "https://clinicaltrials.gov/study/NCT06993207",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-cortivis-nct02983370",
    "title": "Development of a Cortical Visual Neuroprosthesis for the Blind",
    "companySlug": "cortivis",
    "status": "recruiting",
    "condition": "Blindness",
    "targetFunction": "Cortical signal recording for assistive control and neuroscience research",
    "deviceProduct": "Minicraniotomy",
    "locations": [
      "Hospital IMED Elche, Elche, Alicante, Spain",
      "Universidad Miguel Hernandez de Elche, Elche, Alicante, Spain"
    ],
    "endpoints": [
      "Thresholds of visual perceptions elicited by intracortical microstimulation"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT02983370 study record",
        "url": "https://clinicaltrials.gov/study/NCT02983370",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-inbrain-neuroelectronics-nct06368310",
    "title": "FIH Clinical Investigation of Graphene Electrodes for Brain Mapping",
    "companySlug": "inbrain-neuroelectronics",
    "status": "completed",
    "condition": "Brain Tumor; Glioma",
    "targetFunction": "Intraoperative brain mapping now; therapeutic neuromodulation and decoding under development",
    "deviceProduct": "INBRAIN Graphene Cortical Interface",
    "locations": [
      "Manchester Centre for Clinical Neurosciences, Northern Care Alliance NHS Foundation Trust, Salford, Greater Manchester, United Kingdom"
    ],
    "endpoints": [
      "To evaluate the preliminary safety of the investigational device for its intended use"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06368310 study record",
        "url": "https://clinicaltrials.gov/study/NCT06368310",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-mjn-neuroserveis-nct05845255",
    "title": "Evaluation of the Epilepsy-related Quality of Life, Seizure-related Accidents and Validation of the Mjn-SERAS Solution in the Normalised Patient Environment with Real-World Data",
    "companySlug": "mjn-neuroserveis",
    "status": "recruiting",
    "condition": "Quality of Life; Epilepsy (treatment Refractory)",
    "targetFunction": "Epilepsy technology for patients",
    "deviceProduct": "mjn-SERAS",
    "locations": [
      "Diakonie Kork, Kork, Germany",
      "Clínica Corachan, Barcelona, Barcelona, Spain",
      "CUN, Madrid, Madrid, Spain",
      "Vithas La Milagrosa, Madrid, Madrid, Spain",
      "CUN, Pamplona, Navarre, Spain",
      "Oxford NHS, Oxford, United Kingdom"
    ],
    "endpoints": [
      "Change in quality of life index of patients with epilepsy",
      "Patient's safety associated with seizure-related accidents"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05845255 study record",
        "url": "https://clinicaltrials.gov/study/NCT05845255",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-starlab-neuroscience-nct04791124",
    "title": "Assessment of Neural Oscillations in Adult Subjects With Down Syndrome and Typically Developing Subjects in Resting State and While Conducting Cognitive Tasks",
    "companySlug": "starlab-neuroscience",
    "status": "unknown",
    "condition": "Down Syndrome",
    "targetFunction": "Brain-state measurement and applied neurotechnology research",
    "deviceProduct": "Electroencephalography",
    "locations": [
      "IMIM (Hospital del Mar Medical Research Institute), Barcelona, Spain"
    ],
    "endpoints": [
      "Differences in gamma intertrial coherence and power between DS and TD group",
      "Differences in power of neural oscillations between DS and TD group",
      "Differences in amplitude and latency of various EEG waves between DS and TD group",
      "Differences in EEG complexity between DS and TD group",
      "Differences in EEG brain connectivity, interhemispheric and frontoparietal connectivity, characteristic path and clustering coefficient between DS and TD group",
      "Differences in cross-frequency coupling between DS and TD group"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04791124 study record",
        "url": "https://clinicaltrials.gov/study/NCT04791124",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-time-is-brain-nct06149754",
    "title": "BraiN20® Monitoring in Acute Stroke Undergoing Thrombectomy",
    "companySlug": "time-is-brain",
    "status": "unknown",
    "condition": "Acute Stroke; Mechanical Thrombectomy",
    "targetFunction": "Faster stroke triage through non-invasive cerebral monitoring",
    "deviceProduct": "BraiN20(R) monitoring of N20 somatosensory evoked potential",
    "locations": [
      "Hospital Universitari Germans Trias i Pujol, Badalona, Catalonia, Spain",
      "Hospital Universitario Vall d'Hebrón, Barcelona, Spain",
      "Hospital Universitario Doctor Josep Trueta, Girona, Spain"
    ],
    "endpoints": [
      "Reliability of the BraiN20® Medical Device"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06149754 study record",
        "url": "https://clinicaltrials.gov/study/NCT06149754",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-flow-neuroscience-nct05202119",
    "title": "Empower: tDCS for Major Depressive Disorder at Home",
    "companySlug": "flow-neuroscience",
    "status": "completed",
    "condition": "Major Depressive Disorder",
    "targetFunction": "Depression treatment support through non-invasive stimulation",
    "deviceProduct": "Transcranial direct current stimulation; Sham Transcranial direct current stimulation",
    "locations": [
      "UT Health Science Center, Houston, Texas, United States",
      "School of Psychology, University East London, London, London, United Kingdom"
    ],
    "endpoints": [
      "HDRS-17 - Hamilton Depression Ratin Scale"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05202119 study record",
        "url": "https://clinicaltrials.gov/study/NCT05202119",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-integrum-nct06753110",
    "title": "A Multicenter, Multinational, Cohort Long-term Post-market Clinical Follow-up (PMCF) of the Safety and Efficacy of the Osseoanchored Prostheses for the Rehabilitation of Amputees (OPRA) Implant System When Used for Transhumeral Implantation in Amputee Patients",
    "companySlug": "integrum",
    "status": "recruiting",
    "condition": "Amputation of Upper Limb",
    "targetFunction": "osseointegrated and neural-connected prosthetics.",
    "deviceProduct": "OPRA transhumeral",
    "locations": [
      "The Alfred Hospital, Melbourne, Victoria, Australia",
      "Medical University of Vienna Clinical laboratory for bionic limb reconstruction Währinger Gürtel 18-20 1090 Vienna, AUSTRIA, Vienna, Austria",
      "University Hospital Ghent, UX Ghent, Ghent, Belgium",
      "Hannover Medical School, Hanover, Germany",
      "University Hospital Tübing, Tübingen, Germany",
      "University Medical Center Groningen, Groningen, Netherlands"
    ],
    "endpoints": [
      "Implant Safety and Effectivness"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06753110 study record",
        "url": "https://clinicaltrials.gov/study/NCT06753110",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-aleva-neurotherapeutics-nct01764815",
    "title": "Evaluation of Directional Stimulation During the Implantation of Deep Brain Stimulation (DBS) Leads",
    "companySlug": "aleva-neurotherapeutics",
    "status": "completed",
    "condition": "Parkinson's Disease; Essential Tremor",
    "targetFunction": "DBS therapy support for Parkinson's disease and essential tremor",
    "deviceProduct": "directSTN Acute lead connected to external neurostimulator",
    "locations": [
      "Inselspital University Hospital, Bern, Switzerland"
    ],
    "endpoints": [
      "Measurement of the therapeutic window's boundaries when stimulating in specific angular directions, and comparison to those obtained when stimulating in all directions."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT01764815 study record",
        "url": "https://clinicaltrials.gov/study/NCT01764815",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-artiria-medical-nct06972966",
    "title": "NEUROvascular NAVigation With Remotely Controlled Deflectable Guidewire, Study II (NeuroNAV Study II)",
    "companySlug": "artiria-medical",
    "status": "recruiting",
    "condition": "Unruptured Cerebral Aneurysm",
    "targetFunction": "Minimally invasive neurovascular access and stroke intervention support",
    "deviceProduct": "SmartGUIDE (deflectable guidewire); Any standard of care guidewire",
    "locations": [
      "Państwowy Instytut Medyczny MSWiA, Warsaw, Poland"
    ],
    "endpoints": [
      "Performance"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06972966 study record",
        "url": "https://clinicaltrials.gov/study/NCT06972966",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-bottneuro-nct05999916",
    "title": "Evaluate the Safety and Feasibility of tACS With the Miamind Neurostimulator in Healthy Participants",
    "companySlug": "bottneuro",
    "status": "completed",
    "condition": "Healthy Participants; Healthy Population",
    "targetFunction": "Home-based cognitive and neurological-disorder treatment support",
    "deviceProduct": "Personalized Miamind Neurostimulator",
    "locations": [
      "Universitätsspital Basel, Basel, Canton of Basel-City, Switzerland"
    ],
    "endpoints": [
      "Safety: Incidence of Treatment-Emergent Adverse Events"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05999916 study record",
        "url": "https://clinicaltrials.gov/study/NCT05999916",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-comphya-nct06968494",
    "title": "Safety and Tolerability of a Novel Implantable Device for the Treatment of Erectile Dysfunction",
    "companySlug": "comphya",
    "status": "recruiting",
    "condition": "Erectile Dysfunction Following Radical Prostatectomy",
    "targetFunction": "EMG-driven hand rehabilitation.",
    "deviceProduct": "Activation of pro-erectile nerves within the pelvic plexus",
    "locations": [
      "Johns Hopkins Hospital, Baltimore, Maryland, United States"
    ],
    "endpoints": [
      "Occurrence of adverse events",
      "Occurrence of surgical complications",
      "Occurrence of device deficiencies",
      "Pain assessment"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06968494 study record",
        "url": "https://clinicaltrials.gov/study/NCT06968494",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-machinemd-nct06733077",
    "title": "Development of Digital Services for Parkinson's Disease",
    "companySlug": "machinemd",
    "status": "recruiting",
    "condition": "Healthy Controls; Parkinson's Disease",
    "targetFunction": "Multi-indication technology for clinicians",
    "deviceProduct": "gait with cueing wearable device and neuro-ocular performance",
    "locations": [
      "University of Exeter, Exeter, United Kingdom"
    ],
    "endpoints": [
      "Step length",
      "Step rate",
      "Step length symmetry index",
      "Walking speed",
      "Timed Up and Go test",
      "Five times Sit to Stand"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06733077 study record",
        "url": "https://clinicaltrials.gov/study/NCT06733077",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-mindmaze-nct07427511",
    "title": "SwissNeuroRehab - HDHI",
    "companySlug": "mindmaze",
    "status": "recruiting",
    "condition": "Stroke",
    "targetFunction": "Stroke and neurological recovery assessment and rehabilitation",
    "deviceProduct": "Device assisted high-dose therapy",
    "locations": [
      "Lake Lucerne Institute, Vitznau, Canton of Lucerne, Switzerland",
      "Klinik Valens, Valens, Canton of St. Gallen, Switzerland",
      "Centre hospitalier universitaire Vaudois, Lausanne, Canton of Vaud, Switzerland",
      "Swiss Réhabilitation Sàrl, Sullens, Canton of Vaud, Switzerland",
      "Universitätspital Zürich, Zurich, Canton of Zurich, Switzerland"
    ],
    "endpoints": [
      "HDHI training adherence (Active Training Time, ATT)",
      "Feasibility and satisfaction with the HDHI program (Program Feasibility and Satisfaction Questionnaire)"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07427511 study record",
        "url": "https://clinicaltrials.gov/study/NCT07427511",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-myoswiss-nct05579197",
    "title": "Myosuit Chronic Stroke Protocol",
    "companySlug": "myoswiss",
    "status": "completed",
    "condition": "Stroke; Ischemic Stroke; Haemorrhagic Stroke",
    "targetFunction": "Mobility assistance and gait rehabilitation after neurological injury",
    "deviceProduct": "Lower-limb robotic intervention",
    "locations": [
      "IRCCS Fondazione Don Carlo Gnocchi onlus, Florence, Italy"
    ],
    "endpoints": [
      "Usability of the device",
      "Self-efficacy"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05579197 study record",
        "url": "https://clinicaltrials.gov/study/NCT05579197",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-positrigo-nct06344871",
    "title": "Exploratory Study Using a New Head-only PET Scanner / ExploreNeuroLF",
    "companySlug": "positrigo",
    "status": "recruiting",
    "condition": "Brain Diseases",
    "targetFunction": "Multi-indication technology for clinicians",
    "deviceProduct": "NeuroLF; Conventional PET scan",
    "locations": [
      "University Hospital Leipzig, Leipzig, Germany",
      "University Hospital Zurich, Zurich, Switzerland"
    ],
    "endpoints": [
      "PET Image of the Brain"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06344871 study record",
        "url": "https://clinicaltrials.gov/study/NCT06344871",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neuronostics-nct06097195",
    "title": "The Clinical Utility of BioEP in Diagnostic Decision Making in Epilepsy",
    "companySlug": "neuronostics",
    "status": "recruiting",
    "condition": "Epilepsy",
    "targetFunction": "Epilepsy technology for clinicians",
    "deviceProduct": "BioEP",
    "locations": [
      "Royal Cornwall Hospitals Trust, Truro, United Kingdom",
      "The Royal Wolverhampton NHS Trust, Wolverhampton, United Kingdom"
    ],
    "endpoints": [
      "The primary outcome is epilepsy diagnosis (yes/no) at baseline."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06097195 study record",
        "url": "https://clinicaltrials.gov/study/NCT06097195",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-amber-therapeutics-nct06885931",
    "title": "Augmenting Urinary Reflex Activity Study 4 (Including eXtended Indications)",
    "companySlug": "amber-therapeutics",
    "status": "recruiting",
    "condition": "Mixed Urinary Incontinence; Stress Urinary Incontinence (SUI); Chronic Pelvic Pain; Urge Urinary Incontinence",
    "targetFunction": "Closed-loop therapy for mixed urinary incontinence",
    "deviceProduct": "Pudendal neuromodulation",
    "locations": [
      "UZ Leuven, Leuven, Herestraat 49, Belgium",
      "Universitair Ziekenhuis Antwerpen, Edegem, Belgium",
      "Ghent University Hospital, Ghent, Belgium",
      "Maastricht UMC, Maastricht, Netherlands",
      "Southmead Hospital, Bristol, United Kingdom",
      "University College London Hospital, London, United Kingdom",
      "Guy's Hospital, London, United Kingdom"
    ],
    "endpoints": [
      "Summative rates of procedural and device related adverse events and device deficiencies.",
      "Urinary Distress Inventory score change",
      "Proportion of participants requiring surgical reintervention."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06885931 study record",
        "url": "https://clinicaltrials.gov/study/NCT06885931",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-bioinduction-nct06387914",
    "title": "Efficacy of Pain Intervention With Deep Brain Stimulation Neuromodulation",
    "companySlug": "bioinduction",
    "status": "recruiting",
    "condition": "Central Post Stroke Pain",
    "targetFunction": "Closed-loop neural sensing and stimulation for chronic neurological conditions",
    "deviceProduct": "Stimulation ON; Stimulation Pseudo-ON",
    "locations": [
      "John Radcliffe Hospital, Oxford, Oxfordshire, United Kingdom"
    ],
    "endpoints": [
      "McGill Pain Questionnaire V2.0 -Short Form - Present Pain Intensity (MQ-SF-PPI) score"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06387914 study record",
        "url": "https://clinicaltrials.gov/study/NCT06387914",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-brainomix-nct05199662",
    "title": "Randomization to Extend Stroke Intravenous ThromboLysis In Evolving Non-Large Vessel Occlusion With TNK (RESILIENT",
    "companySlug": "brainomix",
    "status": "recruiting",
    "condition": "Ischemic Stroke, Acute",
    "targetFunction": "Rapid standardized brain-scan analysis and treatment-decision support",
    "deviceProduct": "Intravenous tenecteplase; Placebo",
    "locations": [
      "Hospital Moinhos de Vento, Porto Alegre, Rio Grande do Sul, Brazil",
      "Hospital das Clínicas Botucatu, Botucatu, Brazil",
      "Hospital das Clínicas - UNICAMP, Campinas, Brazil",
      "Hospital Universitário Maria Aparecida Pedrossian, Campo Grande, Brazil",
      "Hospital das Clínicas UFPR, Curitiba, Brazil",
      "Hospital Geral de Fortaleza, Fortaleza, Brazil",
      "Clinica Neurologica e Neurocirurgica de Joinville, Joinville, Brazil",
      "Hospital Metropolitano de Maceió, Maceió, Brazil"
    ],
    "endpoints": [
      "Rates of Good Functional Outcomes adjusted for the baseline mRS and stroke severity (NIHSS) according to the modified Rankin Scale scores at 90 days"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05199662 study record",
        "url": "https://clinicaltrials.gov/study/NCT05199662",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-brainpatch-nct07715227",
    "title": "Vestibular Perception Gates Autonomic Responses to Sinusoidal Galvanic Vestibular Stimulation",
    "companySlug": "brainpatch",
    "status": "completed",
    "condition": "Healthy Volunteers",
    "targetFunction": "Meditation-state induction, stress reduction, and wellness neurotechnology",
    "deviceProduct": "Galvanic Vestibular Stimulation (GVS) using BrainPatch device",
    "locations": [
      "JSC \"Kazakhtelecom\", Almaty, Kazakhstan",
      "Al-Farabi Kazakh National University, Almaty, Kazakhstan"
    ],
    "endpoints": [
      "Change in Heart Rate Variability (HRV) Indices from Baseline to Post-Course and During Acute Stimulation"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07715227 study record",
        "url": "https://clinicaltrials.gov/study/NCT07715227",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-cambridge-cognition-nct07326124",
    "title": "Stratification and Treatment in Early Psychosis Study -ASSIST",
    "companySlug": "cambridge-cognition",
    "status": "not yet recruiting",
    "condition": "Treatment Resistant Psychosis; Psychosis",
    "targetFunction": "Cognitive assessment in clinical trials and healthcare workflows",
    "deviceProduct": "CBD 100 mg/mL Oral Solution; Placeb",
    "locations": [
      "Charité Universitätsmedizin, Berlin, Germany",
      "University Hospital Cologne, Cologne, Germany",
      "Ludwig-Maximilian-University Munich, Munich, Germany",
      "National and Kapodistrian University of Athens, Athens, Greece",
      "Shalvata Mental Health Center, Hod HaSharon, Israel",
      "Geha Mental Health Center, Petah Tikva, Israel",
      "Sheba Medical Centre, Ramat Gan, Israel",
      "University of Campania 'Luigi Vanvitelli', Naples, Italy"
    ],
    "endpoints": [
      "Change in Positive and Negative Syndrome Scale (PANSS) total score"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07326124 study record",
        "url": "https://clinicaltrials.gov/study/NCT07326124",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-coherence-neuro-nct07465796",
    "title": "A First-in-Human Study of the CIPHER System During Brain Surgery for Newly Diagnosed Glioma",
    "companySlug": "coherence-neuro",
    "status": "recruiting",
    "condition": "Glioma; Tumor; Electrocorticography; Brain",
    "targetFunction": "Tumor-oriented neuromodulation and neural-interface therapy development",
    "deviceProduct": "Electrocorticography for neural recording; Electrocorticography for neural recording and electrical stimulation",
    "locations": [
      "The Royal Melbourne Hospital, Department of Neurosurgery 4 East, Melbourne, Victoria, Australia"
    ],
    "endpoints": [
      "Incidence of all device/procedure-related adverse events (safety and tolerability) relevant to the intended use of the study device"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07465796 study record",
        "url": "https://clinicaltrials.gov/study/NCT07465796",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-comind-nct06368648",
    "title": "CoMind Early Feasibility Study",
    "companySlug": "comind",
    "status": "recruiting",
    "condition": "Intracranial Pressure; Intracranial Pressure Changes; Traumatic Brain Injury; Intracerebral Hemorrhage",
    "targetFunction": "Brain health monitoring and clinical neuroimaging workflows",
    "deviceProduct": "Optical non-invasive brain monitoring",
    "locations": [
      "UC Davis Medical Center, Sacramento, California, United States",
      "Christiana Care, Wilmington, Delaware, United States",
      "Medstar Health, Washington D.C., District of Columbia, United States",
      "Jackson Memorial Hospital, Miami, Florida, United States",
      "The University of Kansas Medical Center, Kansas City, Kansas, United States",
      "Washington University Medical Center, St Louis, Missouri, United States",
      "Albany Medical College, Albany, New York, United States",
      "Stony Brook University Hospital, Stony Brook, New York, United States"
    ],
    "endpoints": [
      "A test of the difference in estimation errors between two non-invasive ICP estimation models: one trained with ABP and CoMind One EFS CBFi, and one trained only using ABP",
      "Models trained using CoMind CBFi and ABP will be evaluated based on their limits of agreement (LOA) with invasive ICP."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06368648 study record",
        "url": "https://clinicaltrials.gov/study/NCT06368648",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-ear-switch-nct06090448",
    "title": "Technical Evaluation of Earswitch Phase B",
    "companySlug": "ear-switch",
    "status": "unknown",
    "condition": "Motor Neuron Disease",
    "targetFunction": "Accessible communication and control for people with motor impairments",
    "deviceProduct": "EarSwitch device",
    "locations": [
      "No locations listed in the cached registry fields"
    ],
    "endpoints": [
      "To determine whether the EarSwitch system can be used for interaction by detecting in-ear movements (IEMs), and whether this differs with motor neurological disability and to assess its change over 4 weeks, in participants from three clinical groups."
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06090448 study record",
        "url": "https://clinicaltrials.gov/study/NCT06090448",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-galvani-bioelectronics-nct04955899",
    "title": "Safety of Splenic Stimulation for RA",
    "companySlug": "galvani-bioelectronics",
    "status": "recruiting",
    "condition": "Rheumatoid Arthritis",
    "targetFunction": "Treating chronic disease through targeted neural signals",
    "deviceProduct": "Active Stimulation",
    "locations": [
      "Academic Medical Center (AMC) Dept of Rheumatology & Clinical Immunology, Amsterdam, Netherlands",
      "Greater Glasgow Health Board, Glasgow, United Kingdom"
    ],
    "endpoints": [
      "Safety and tolerability of the Galvani system"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT04955899 study record",
        "url": "https://clinicaltrials.gov/study/NCT04955899",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-livanova-nct05952674",
    "title": "Treatment Resistant Depression and Vagus Nerve Stimulation",
    "companySlug": "livanova",
    "status": "recruiting",
    "condition": "Treatment Resistant Depression (TRD)",
    "targetFunction": "Epilepsy, depression, and autonomic neuromodulation treatment",
    "deviceProduct": "Vagus Nerve Stimulation (VNS); Best Medical Treatment",
    "locations": [
      "CHU Angers, Angers, France, France",
      "Centre Hospitalier Charles Perrens, Bordeaux, France, France",
      "CHU Caen, Caen, France, France",
      "CHU Clermont-Ferrand, Hôpital Gabriel Montpied, Clermont-Ferrand, France, France",
      "AP-HP. Nord - Université de Paris, Hôpital Louis Mourier, Colombes, France, France",
      "APHP. Hôpitaux Universitaires Henri Mondor, Hôpital Henri Mondor, Créteil, France, France",
      "CHU Dijon, Hôpital Le Bocage, Dijon, France, France",
      "CHU Grenoble Alpes, Grenoble, France, France"
    ],
    "endpoints": [
      "Cost-utility of VNS"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT05952674 study record",
        "url": "https://clinicaltrials.gov/study/NCT05952674",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-magstim-nct03795051",
    "title": "Coil Positioning in Navigated Transcranial Magnetic Stimulation Feasibility in Depression Patients Trial",
    "companySlug": "magstim",
    "status": "completed",
    "condition": "Depressive Disorder, Major",
    "targetFunction": "Clinical and research TMS for neuropsychiatric and neurophysiology applications",
    "deviceProduct": "Navigated Transcranial Magnetic Stimulation",
    "locations": [
      "Georgia Behavioral Health Professionals, Atlanta, Georgia, United States",
      "Georgia Behavioral Health Professionals, Dunwoody, Georgia, United States"
    ],
    "endpoints": [
      "Percentage of successful nTMS treatment sessions"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT03795051 study record",
        "url": "https://clinicaltrials.gov/study/NCT03795051",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-neurovalens-nct06956118",
    "title": "Electrical Vestibular Nerve Stimulation (VeNS) as a Treatment for Improving Sleep in Visually Impaired Patients",
    "companySlug": "neurovalens",
    "status": "recruiting",
    "condition": "Sleep Quality; Quality of Lifte; Non-24 Sleep-Wake Disorder",
    "targetFunction": "Metabolic and mental-health neuromodulation research",
    "deviceProduct": "Intervention (VeNS Stimulation) Device; Control (Sham Stimulation) Device",
    "locations": [
      "BGS MCH Hospital, Bengaluru, India"
    ],
    "endpoints": [
      "Preliminary evidence of efficacy",
      "Safety Outcome"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06956118 study record",
        "url": "https://clinicaltrials.gov/study/NCT06956118",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-parasym-nct07510074",
    "title": "Modulating Inflammation in Neuro-Trauma",
    "companySlug": "parasym",
    "status": "not yet recruiting",
    "condition": "Traumatic Brain Injury",
    "targetFunction": "Autonomic and inflammatory-condition neuromodulation research",
    "deviceProduct": "Nurosym taVNS; Nurosym (sham)",
    "locations": [
      "University Hospital, San Antonio, Texas, United States",
      "University of Texas Health Science Center at San Antonio, San Antonio, Texas, United States"
    ],
    "endpoints": [
      "Number of Adverse Events",
      "Feasibility of recruitment"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT07510074 study record",
        "url": "https://clinicaltrials.gov/study/NCT07510074",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-trial-phagenesis-nct06866418",
    "title": "Phagenyx® Registry Study",
    "companySlug": "phagenesis",
    "status": "recruiting",
    "condition": "Dysphagia",
    "targetFunction": "Pharyngeal electrical stimulation for neurogenic dysphagia",
    "deviceProduct": "1. Phagenyx® System Group Patients",
    "locations": [
      "Banner University Medical Center, Phoenix, Arizona, United States",
      "HMH Jersey Shore University Medical Center, Neptune City, New Jersey, United States",
      "University of Texas, Houston, Texas, United States"
    ],
    "endpoints": [
      "Swallowing safety",
      "Nutritional Management"
    ],
    "evidenceLevel": "E3",
    "sourceLinks": [
      {
        "title": "NCT06866418 study record",
        "url": "https://clinicaltrials.gov/study/NCT06866418",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];

export const europeEvidenceMilestones: Milestone[] = [
  {
    "id": "europe-milestone-aurimod-nct07628179-start",
    "title": "AURIMOD study is scheduled to open",
    "companySlug": "aurimod",
    "dateLabel": "17 Sept 2026 (estimated)",
    "sortDate": "2026-09-17",
    "status": "upcoming",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 17 Sept 2026 (estimated) as the study start and currently marks the study not yet recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07628179 study record",
        "url": "https://clinicaltrials.gov/study/NCT07628179",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-aurimod-nct07628179-completion",
    "title": "AURIMOD study completion window listed",
    "companySlug": "aurimod",
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
        "title": "NCT07628179 study record",
        "url": "https://clinicaltrials.gov/study/NCT07628179",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-icometrix-nct06280755-start",
    "title": "Icometrix study opens",
    "companySlug": "icometrix",
    "dateLabel": "1 Mar 2024",
    "sortDate": "2024-03-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 1 Mar 2024 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06280755 study record",
        "url": "https://clinicaltrials.gov/study/NCT06280755",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-icometrix-nct06280755-completion",
    "title": "Icometrix study completion window listed",
    "companySlug": "icometrix",
    "dateLabel": "Apr 2027 (estimated)",
    "sortDate": "2027-04-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Apr 2027 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06280755 study record",
        "url": "https://clinicaltrials.gov/study/NCT06280755",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-nyxoah-nct07331285-start",
    "title": "Nyxoah study opens",
    "companySlug": "nyxoah",
    "dateLabel": "Jun 2026 (estimated)",
    "sortDate": "2026-06-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Jun 2026 (estimated) as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07331285 study record",
        "url": "https://clinicaltrials.gov/study/NCT07331285",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-nyxoah-nct07331285-completion",
    "title": "Nyxoah study completion window listed",
    "companySlug": "nyxoah",
    "dateLabel": "Oct 2032 (estimated)",
    "sortDate": "2032-10-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Oct 2032 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07331285 study record",
        "url": "https://clinicaltrials.gov/study/NCT07331285",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-synergia-medical-nct06340802-start",
    "title": "Synergia Medical study opens",
    "companySlug": "synergia-medical",
    "dateLabel": "6 Aug 2024",
    "sortDate": "2024-08-06",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 6 Aug 2024 as the study start and currently marks the study active not recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06340802 study record",
        "url": "https://clinicaltrials.gov/study/NCT06340802",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-synergia-medical-nct06340802-completion",
    "title": "Synergia Medical study completion window listed",
    "companySlug": "synergia-medical",
    "dateLabel": "Oct 2026 (estimated)",
    "sortDate": "2026-10-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Oct 2026 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06340802 study record",
        "url": "https://clinicaltrials.gov/study/NCT06340802",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-neuro-event-labs-nct06705439-start",
    "title": "Neuro Event Labs study opens",
    "companySlug": "neuro-event-labs",
    "dateLabel": "15 Nov 2024",
    "sortDate": "2024-11-15",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 15 Nov 2024 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06705439 study record",
        "url": "https://clinicaltrials.gov/study/NCT06705439",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-bioserenity-nct03725462-start",
    "title": "BioSerenity study opens",
    "companySlug": "bioserenity",
    "dateLabel": "16 Oct 2017",
    "sortDate": "2017-10-16",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 16 Oct 2017 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT03725462 study record",
        "url": "https://clinicaltrials.gov/study/NCT03725462",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-resolve-stroke-nct07324421-start",
    "title": "Resolve Stroke study opens",
    "companySlug": "resolve-stroke",
    "dateLabel": "25 Oct 2025",
    "sortDate": "2025-10-25",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 25 Oct 2025 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07324421 study record",
        "url": "https://clinicaltrials.gov/study/NCT07324421",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-resolve-stroke-nct07324421-completion",
    "title": "Resolve Stroke study completion window listed",
    "companySlug": "resolve-stroke",
    "dateLabel": "15 Aug 2026 (estimated)",
    "sortDate": "2026-08-15",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 15 Aug 2026 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07324421 study record",
        "url": "https://clinicaltrials.gov/study/NCT07324421",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-sensome-nct04993079-start",
    "title": "Sensome study opens",
    "companySlug": "sensome",
    "dateLabel": "26 Aug 2021",
    "sortDate": "2021-08-26",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 26 Aug 2021 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT04993079 study record",
        "url": "https://clinicaltrials.gov/study/NCT04993079",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-wandercraft-nct07536386-start",
    "title": "Wandercraft study opens",
    "companySlug": "wandercraft",
    "dateLabel": "10 Feb 2026",
    "sortDate": "2026-02-10",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 10 Feb 2026 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07536386 study record",
        "url": "https://clinicaltrials.gov/study/NCT07536386",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-ceregate-nct05292794-start",
    "title": "CereGate study opens",
    "companySlug": "ceregate",
    "dateLabel": "18 Apr 2022",
    "sortDate": "2022-04-18",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 18 Apr 2022 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05292794 study record",
        "url": "https://clinicaltrials.gov/study/NCT05292794",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-ceregate-nct05292794-completion",
    "title": "CereGate study completion window listed",
    "companySlug": "ceregate",
    "dateLabel": "Jul 2027 (estimated)",
    "sortDate": "2027-07-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Jul 2027 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT05292794 study record",
        "url": "https://clinicaltrials.gov/study/NCT05292794",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-capri-medical-nct05914948-start",
    "title": "Capri Medical study opens",
    "companySlug": "capri-medical",
    "dateLabel": "May 2024 (estimated)",
    "sortDate": "2024-05-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists May 2024 (estimated) as the study start and currently marks the study unknown.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05914948 study record",
        "url": "https://clinicaltrials.gov/study/NCT05914948",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-newronika-nct06891781-completion",
    "title": "Newronika study completion window listed",
    "companySlug": "newronika",
    "dateLabel": "Aug 2029 (estimated)",
    "sortDate": "2029-08-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Aug 2029 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06891781 study record",
        "url": "https://clinicaltrials.gov/study/NCT06891781",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-salvia-bioelectronics-nct07113470-start",
    "title": "Salvia BioElectronics study opens",
    "companySlug": "salvia-bioelectronics",
    "dateLabel": "13 Apr 2026",
    "sortDate": "2026-04-13",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 13 Apr 2026 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07113470 study record",
        "url": "https://clinicaltrials.gov/study/NCT07113470",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-salvia-bioelectronics-nct07113470-completion",
    "title": "Salvia BioElectronics study completion window listed",
    "companySlug": "salvia-bioelectronics",
    "dateLabel": "1 Dec 2028 (estimated)",
    "sortDate": "2028-12-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 1 Dec 2028 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07113470 study record",
        "url": "https://clinicaltrials.gov/study/NCT07113470",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-able-human-motion-nct07550699-start",
    "title": "ABLE Human Motion study opens",
    "companySlug": "able-human-motion",
    "dateLabel": "20 Apr 2026",
    "sortDate": "2026-04-20",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 20 Apr 2026 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07550699 study record",
        "url": "https://clinicaltrials.gov/study/NCT07550699",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-able-human-motion-nct07550699-completion",
    "title": "ABLE Human Motion study completion window listed",
    "companySlug": "able-human-motion",
    "dateLabel": "12 Aug 2026 (estimated)",
    "sortDate": "2026-08-12",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 12 Aug 2026 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07550699 study record",
        "url": "https://clinicaltrials.gov/study/NCT07550699",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-cortivis-nct02983370-start",
    "title": "Cortivis study opens",
    "companySlug": "cortivis",
    "dateLabel": "1 Oct 2019",
    "sortDate": "2019-10-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 1 Oct 2019 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT02983370 study record",
        "url": "https://clinicaltrials.gov/study/NCT02983370",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-cortivis-nct02983370-completion",
    "title": "Cortivis study completion window listed",
    "companySlug": "cortivis",
    "dateLabel": "Oct 2028 (estimated)",
    "sortDate": "2028-10-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Oct 2028 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT02983370 study record",
        "url": "https://clinicaltrials.gov/study/NCT02983370",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-mjn-neuroserveis-nct05845255-start",
    "title": "MJN Neuroserveis study opens",
    "companySlug": "mjn-neuroserveis",
    "dateLabel": "1 May 2023",
    "sortDate": "2023-05-01",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 1 May 2023 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05845255 study record",
        "url": "https://clinicaltrials.gov/study/NCT05845255",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-integrum-nct06753110-start",
    "title": "Integrum study opens",
    "companySlug": "integrum",
    "dateLabel": "19 Feb 2025",
    "sortDate": "2025-02-19",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 19 Feb 2025 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06753110 study record",
        "url": "https://clinicaltrials.gov/study/NCT06753110",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-bottneuro-nct05999916-start",
    "title": "Bottneuro study opens",
    "companySlug": "bottneuro",
    "dateLabel": "27 Dec 2023",
    "sortDate": "2023-12-27",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 27 Dec 2023 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT05999916 study record",
        "url": "https://clinicaltrials.gov/study/NCT05999916",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-comphya-nct06968494-start",
    "title": "Comphya study opens",
    "companySlug": "comphya",
    "dateLabel": "5 Jun 2025",
    "sortDate": "2025-06-05",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 5 Jun 2025 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06968494 study record",
        "url": "https://clinicaltrials.gov/study/NCT06968494",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-comphya-nct06968494-completion",
    "title": "Comphya study completion window listed",
    "companySlug": "comphya",
    "dateLabel": "Apr 2027 (estimated)",
    "sortDate": "2027-04-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Apr 2027 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06968494 study record",
        "url": "https://clinicaltrials.gov/study/NCT06968494",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-positrigo-nct06344871-start",
    "title": "Positrigo study opens",
    "companySlug": "positrigo",
    "dateLabel": "13 Mar 2024",
    "sortDate": "2024-03-13",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 13 Mar 2024 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06344871 study record",
        "url": "https://clinicaltrials.gov/study/NCT06344871",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-neuronostics-nct06097195-start",
    "title": "Neuronostics study opens",
    "companySlug": "neuronostics",
    "dateLabel": "21 May 2024",
    "sortDate": "2024-05-21",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 21 May 2024 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06097195 study record",
        "url": "https://clinicaltrials.gov/study/NCT06097195",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-neuronostics-nct06097195-completion",
    "title": "Neuronostics study completion window listed",
    "companySlug": "neuronostics",
    "dateLabel": "31 Dec 2026 (estimated)",
    "sortDate": "2026-12-31",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 31 Dec 2026 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06097195 study record",
        "url": "https://clinicaltrials.gov/study/NCT06097195",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-coherence-neuro-nct07465796-start",
    "title": "Coherence Neuro study opens",
    "companySlug": "coherence-neuro",
    "dateLabel": "22 May 2026",
    "sortDate": "2026-05-22",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 22 May 2026 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT07465796 study record",
        "url": "https://clinicaltrials.gov/study/NCT07465796",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-coherence-neuro-nct07465796-completion",
    "title": "Coherence Neuro study completion window listed",
    "companySlug": "coherence-neuro",
    "dateLabel": "Sept 2026 (estimated)",
    "sortDate": "2026-09-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Sept 2026 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT07465796 study record",
        "url": "https://clinicaltrials.gov/study/NCT07465796",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-galvani-bioelectronics-nct04955899-start",
    "title": "Galvani Bioelectronics study opens",
    "companySlug": "galvani-bioelectronics",
    "dateLabel": "20 Oct 2021",
    "sortDate": "2021-10-20",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 20 Oct 2021 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT04955899 study record",
        "url": "https://clinicaltrials.gov/study/NCT04955899",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-galvani-bioelectronics-nct04955899-completion",
    "title": "Galvani Bioelectronics study completion window listed",
    "companySlug": "galvani-bioelectronics",
    "dateLabel": "Apr 2029 (estimated)",
    "sortDate": "2029-04-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Apr 2029 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT04955899 study record",
        "url": "https://clinicaltrials.gov/study/NCT04955899",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-magstim-nct03795051-start",
    "title": "Magstim study opens",
    "companySlug": "magstim",
    "dateLabel": "9 Jan 2019",
    "sortDate": "2019-01-09",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 9 Jan 2019 as the study start and currently marks the study completed.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT03795051 study record",
        "url": "https://clinicaltrials.gov/study/NCT03795051",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-phagenesis-nct06866418-start",
    "title": "Phagenesis study opens",
    "companySlug": "phagenesis",
    "dateLabel": "15 Sept 2025",
    "sortDate": "2025-09-15",
    "status": "confirmed",
    "type": "trial-opened",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists 15 Sept 2025 as the study start and currently marks the study recruiting.",
    "whyItMatters": "A sponsor-matched registry record establishes a defined human study, public endpoints, and a dateable development checkpoint.",
    "hypeCheck": "Trial registration or study start is not a positive result; outcomes and safety must be assessed from posted results or peer-reviewed publications.",
    "sourceLinks": [
      {
        "title": "NCT06866418 study record",
        "url": "https://clinicaltrials.gov/study/NCT06866418",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-phagenesis-nct06866418-completion",
    "title": "Phagenesis study completion window listed",
    "companySlug": "phagenesis",
    "dateLabel": "Sept 2036 (estimated)",
    "sortDate": "2036-09-01",
    "status": "upcoming",
    "type": "endpoint-readout",
    "evidenceLevel": "E3",
    "confidence": "high",
    "summary": "The registry lists Sept 2036 (estimated) as the estimated study completion window.",
    "whyItMatters": "The registry date provides a concrete watch point for checking whether results or a status update become available.",
    "hypeCheck": "A completion estimate is not a promised readout and can move; completion also does not imply a positive outcome.",
    "sourceLinks": [
      {
        "title": "NCT06866418 study record",
        "url": "https://clinicaltrials.gov/study/NCT06866418",
        "publisher": "ClinicalTrials.gov",
        "sourceType": "trial-registry",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-milestone-time-is-brain-brain20-ce-mark",
    "title": "Time is Brain reports EU MDR CE marking for BraiN20",
    "companySlug": "time-is-brain",
    "dateLabel": "Reported Jul 2026",
    "sortDate": "2026-07-01",
    "status": "confirmed",
    "type": "approval-clearance",
    "evidenceLevel": "E1",
    "confidence": "medium",
    "summary": "Time is Brain's official site and company post report that BraiN20 obtained CE marking under the EU Medical Device Regulation.",
    "whyItMatters": "A CE mark is a regulatory commercialization checkpoint for the named device in Europe.",
    "hypeCheck": "This pass found a first-party announcement, not an independently inspected certificate or notified-body database entry; the mark does not by itself establish improved stroke outcomes.",
    "sourceLinks": [
      {
        "title": "Time is Brain CE-mark announcement",
        "url": "https://www.linkedin.com/feed/update/urn%3Ali%3Aactivity%3A7483474259923632129/",
        "publisher": "Time is Brain",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];

export const europeEvidenceProjects: ProgramProject[] = [
  {
    "id": "europe-project-somareality",
    "companySlug": "somareality",
    "name": "Somareality tracked neurotechnology program",
    "focus": "Research technology for mixed",
    "modality": "Biomarkers",
    "statusLabel": "Research only; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Somareality is retained as a source-backed European neurotechnology program focused on research technology for mixed using biomarkers.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Somareality official website",
        "url": "http://somareality.com/",
        "publisher": "Somareality",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-atlas-neuroengineering",
    "companySlug": "atlas-neuroengineering",
    "name": "ATLAS Neuroengineering tracked neurotechnology program",
    "focus": "Neural recording electrodes and neuroengineering research tools",
    "modality": "Neural recording or interface infrastructure",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "ATLAS Neuroengineering is retained as a source-backed European neurotechnology program focused on neural recording electrodes and neuroengineering research tools using neural recording or interface infrastructure.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "ATLAS Neuroengineering official website",
        "url": "https://www.atlasneuro.com/",
        "publisher": "ATLAS Neuroengineering",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainphonics",
    "companySlug": "brainphonics",
    "name": "Brainphonics tracked neurotechnology program",
    "focus": "Objective hearing assessment from neural responses to speech and everyday sounds",
    "modality": "EEG-based auditory brain-response assessment software",
    "statusLabel": "Investigational EEG diagnostics company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Brainphonics is retained as a source-backed European neurotechnology program focused on objective hearing assessment from neural responses to speech and everyday sounds using eeg-based auditory brain-response assessment software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Brainphonics official technology / product information",
        "url": "https://brainphonics.com",
        "publisher": "Brainphonics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-farow",
    "companySlug": "farow",
    "name": "Farow tracked neurotechnology program",
    "focus": "Epilepsy technology for mixed",
    "modality": "EEG",
    "statusLabel": "CE-Marked; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Farow is retained as a source-backed European neurotechnology program focused on epilepsy technology for mixed using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Farow official website",
        "url": "https://www.epihunter.com/",
        "publisher": "Farow",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuroclues",
    "companySlug": "neuroclues",
    "name": "neuroClues tracked neurotechnology program",
    "focus": "Parkinson's technology for clinicians",
    "modality": "Biomarkers",
    "statusLabel": "CE-Marked; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "neuroClues is retained as a source-backed European neurotechnology program focused on parkinson's technology for clinicians using biomarkers.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "neuroClues official website",
        "url": "https://neuroclues.com/",
        "publisher": "neuroClues",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuroventis",
    "companySlug": "neuroventis",
    "name": "Neuroventis tracked neurotechnology program",
    "focus": "Multi-indication technology for mixed",
    "modality": "Software",
    "statusLabel": "CE-Marked; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neuroventis is retained as a source-backed European neurotechnology program focused on multi-indication technology for mixed using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neuroventis official website",
        "url": "http://www.neuroventis.care/",
        "publisher": "Neuroventis",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-revision-implant",
    "companySlug": "revision-implant",
    "name": "ReVision Implant tracked neurotechnology program",
    "focus": "Vision technology for patients",
    "modality": "Visual prosthesis",
    "statusLabel": "Preclinical; Brain-Computer Interface profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "ReVision Implant is retained as a source-backed European neurotechnology program focused on vision technology for patients using visual prosthesis.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "ReVision Implant official website",
        "url": "https://revision-implant.com/",
        "publisher": "ReVision Implant",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-re4life",
    "companySlug": "re4life",
    "name": "Re4Life tracked neurotechnology program",
    "focus": "robotic and sensor-assisted rehabilitation.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Re4Life is retained as a source-backed European neurotechnology program focused on robotic and sensor-assisted rehabilitation. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Re4Life official website",
        "url": "https://re4life.eu/",
        "publisher": "Re4Life",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-emhance",
    "companySlug": "emhance",
    "name": "EMHANCE tracked neurotechnology program",
    "focus": "adaptive non-invasive neurostimulation, early-stage.",
    "modality": "Implantable or peripheral neuromodulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "EMHANCE is retained as a source-backed European neurotechnology program focused on adaptive non-invasive neurostimulation, early-stage. using implantable or peripheral neuromodulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "EMHANCE official website",
        "url": "https://emhance.co/",
        "publisher": "EMHANCE",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-pamel",
    "companySlug": "pamel",
    "name": "PAMEL tracked neurotechnology program",
    "focus": "EEG caps, electrodes and neurophysiology equipment.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "PAMEL is retained as a source-backed European neurotechnology program focused on eeg caps, electrodes and neurophysiology equipment. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "PAMEL official website",
        "url": "https://pamel.hr/",
        "publisher": "PAMEL",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainbeams-health",
    "companySlug": "brainbeams-health",
    "name": "BrainBeams Health tracked neurotechnology program",
    "focus": "audio-visual neuromodulation, early-stage.",
    "modality": "Optical or sensory neurotechnology",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BrainBeams Health is retained as a source-backed European neurotechnology program focused on audio-visual neuromodulation, early-stage. using optical or sensory neurotechnology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BrainBeams Health official website",
        "url": "https://www.brainbeams.health/",
        "publisher": "BrainBeams Health",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-deymed-diagnostic",
    "companySlug": "deymed-diagnostic",
    "name": "DEYMED Diagnostic tracked neurotechnology program",
    "focus": "EEG, EMG, TMS and sleep-diagnostic systems.",
    "modality": "Transcranial magnetic stimulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "DEYMED Diagnostic is retained as a source-backed European neurotechnology program focused on eeg, emg, tms and sleep-diagnostic systems. using transcranial magnetic stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "DEYMED Diagnostic official website",
        "url": "https://deymed.com/",
        "publisher": "DEYMED Diagnostic",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-stimvia",
    "companySlug": "stimvia",
    "name": "Stimvia tracked neurotechnology program",
    "focus": "Other technology for patients",
    "modality": "VNS",
    "statusLabel": "CE-Marked; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Stimvia is retained as a source-backed European neurotechnology program focused on other technology for patients using vns.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Stimvia official website",
        "url": "https://www.stimvia.com/en/",
        "publisher": "Stimvia",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainplus",
    "companySlug": "brainplus",
    "name": "Brain+ tracked neurotechnology program",
    "focus": "Cognitive health and dementia support",
    "modality": "Digital cognitive-assessment and rehabilitation software",
    "statusLabel": "Commercial digital neurohealth company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Brain+ is retained as a source-backed European neurotechnology program focused on cognitive health and dementia support using digital cognitive-assessment and rehabilitation software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Brain+ official technology / product information",
        "url": "https://www.brain-plus.com/",
        "publisher": "Brain+",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-braincapture",
    "companySlug": "braincapture",
    "name": "BrainCapture tracked neurotechnology program",
    "focus": "Remote epilepsy detection and ambulatory neurological diagnostics",
    "modality": "Portable EEG and telemedicine software",
    "statusLabel": "CE-marked portable EEG diagnostics company listed by NeuroFounders",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BrainCapture is retained as a source-backed European neurotechnology program focused on remote epilepsy detection and ambulatory neurological diagnostics using portable eeg and telemedicine software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BrainCapture official technology / product information",
        "url": "https://braincapture.dk",
        "publisher": "BrainCapture",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainreader",
    "companySlug": "brainreader",
    "name": "Brainreader tracked neurotechnology program",
    "focus": "automated measurement of brain structures from MRI.",
    "modality": "Magnetic-resonance neuroimaging",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Brainreader is retained as a source-backed European neurotechnology program focused on automated measurement of brain structures from mri. using magnetic-resonance neuroimaging.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Brainreader official website",
        "url": "https://brainreader.net/",
        "publisher": "Brainreader",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-cebreo-medical",
    "companySlug": "cebreo-medical",
    "name": "Cebreo Medical tracked neurotechnology program",
    "focus": "ambulatory in-ear EEG through its NeuroBuds platform.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cebreo Medical is retained as a source-backed European neurotechnology program focused on ambulatory in-ear eeg through its neurobuds platform. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cebreo Medical official website",
        "url": "https://cebreomedical.com/mainpage",
        "publisher": "Cebreo Medical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-cercare-medical",
    "companySlug": "cercare-medical",
    "name": "Cercare Medical tracked neurotechnology program",
    "focus": "Stroke and neurological image analysis",
    "modality": "CT/MRI perfusion and neuroimaging decision-support software",
    "statusLabel": "CE-marked neuroimaging software company listed by NeuroFounders",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cercare Medical is retained as a source-backed European neurotechnology program focused on stroke and neurological image analysis using ct/mri perfusion and neuroimaging decision-support software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cercare Medical official technology / product information",
        "url": "https://cercare-medical.com",
        "publisher": "Cercare Medical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-cerebriu",
    "companySlug": "cerebriu",
    "name": "Cerebriu tracked neurotechnology program",
    "focus": "Fast brain MRI decision support, stroke workflows, and scan optimization",
    "modality": "MRI workflow and AI neuroimaging software",
    "statusLabel": "CE-marked neuroimaging software company listed by NeuroFounders",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cerebriu is retained as a source-backed European neurotechnology program focused on fast brain mri decision support, stroke workflows, and scan optimization using mri workflow and ai neuroimaging software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cerebriu official technology / product information",
        "url": "https://www.cerebriu.com",
        "publisher": "Cerebriu",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-imotions",
    "companySlug": "imotions",
    "name": "iMotions tracked neurotechnology program",
    "focus": "Human neuroscience and cognitive research infrastructure",
    "modality": "Multimodal biosignal, EEG, eye-tracking, and human-behavior research platform",
    "statusLabel": "Established research-technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "iMotions is retained as a source-backed European neurotechnology program focused on human neuroscience and cognitive research infrastructure using multimodal biosignal, eeg, eye-tracking, and human-behavior research platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "iMotions official technology / product information",
        "url": "https://imotions.com/",
        "publisher": "iMotions",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-insai",
    "companySlug": "insai",
    "name": "Insai tracked neurotechnology program",
    "focus": "Research technology for pharma",
    "modality": "EEG",
    "statusLabel": "Research only; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Insai is retained as a source-backed European neurotechnology program focused on research technology for pharma using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Insai official website",
        "url": "https://insai.tech/",
        "publisher": "Insai",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-platoscience",
    "companySlug": "platoscience",
    "name": "PlatoScience tracked neurotechnology program",
    "focus": "Non-invasive neuromodulation research and clinical translation",
    "modality": "Transcranial electrical stimulation hardware and research tools",
    "statusLabel": "Commercial stimulation-technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "PlatoScience is retained as a source-backed European neurotechnology program focused on non-invasive neuromodulation research and clinical translation using transcranial electrical stimulation hardware and research tools.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "PlatoScience official technology / product information",
        "url": "https://www.platoscience.com/",
        "publisher": "PlatoScience",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurotech-ai",
    "companySlug": "neurotech-ai",
    "name": "NeuroTech AI tracked neurotechnology program",
    "focus": "camera-based movement analysis for earlier Parkinson's assessment.",
    "modality": "Digital neurological assessment or monitoring",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroTech AI is retained as a source-backed European neurotechnology program focused on camera-based movement analysis for earlier parkinson's assessment. using digital neurological assessment or monitoring.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroTech AI official website",
        "url": "https://neurotechai.eu/",
        "publisher": "NeuroTech AI",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-audicin",
    "companySlug": "audicin",
    "name": "Audicin tracked neurotechnology program",
    "focus": "binaural-beat audio app and sleep headband; consumer wellness, not a medical device.",
    "modality": "Optical or sensory neurotechnology",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Audicin is retained as a source-backed European neurotechnology program focused on binaural-beat audio app and sleep headband; consumer wellness, not a medical device. using optical or sensory neurotechnology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Audicin official website",
        "url": "https://audicin.com/",
        "publisher": "Audicin",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-bittium",
    "companySlug": "bittium",
    "name": "Bittium tracked neurotechnology program",
    "focus": "clinical neurophysiology and monitoring.",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Bittium is retained as a source-backed European neurotechnology program focused on clinical neurophysiology and monitoring. using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Bittium official website",
        "url": "https://www.bittium.com/",
        "publisher": "Bittium",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-cerenion",
    "companySlug": "cerenion",
    "name": "Cerenion tracked neurotechnology program",
    "focus": "Continuous brain-function monitoring and neurological prognosis support",
    "modality": "Automated EEG analysis for intensive care",
    "statusLabel": "Commercial EEG analytics company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cerenion is retained as a source-backed European neurotechnology program focused on continuous brain-function monitoring and neurological prognosis support using automated eeg analysis for intensive care.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cerenion official technology / product information",
        "url": "https://cerenion.com/",
        "publisher": "Cerenion",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-iconeus",
    "companySlug": "iconeus",
    "name": "ICONEUS tracked neurotechnology program",
    "focus": "Research technology for researchers",
    "modality": "Ultrasound",
    "statusLabel": "Research only; Neuroimaging profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "ICONEUS is retained as a source-backed European neurotechnology program focused on research technology for researchers using ultrasound.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "ICONEUS official website",
        "url": "http://iconeus.com/",
        "publisher": "ICONEUS",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-karavela-ai",
    "companySlug": "karavela-ai",
    "name": "Karavela AI tracked neurotechnology program",
    "focus": "Research technology for mixed",
    "modality": "Software",
    "statusLabel": "Research only; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Karavela AI is retained as a source-backed European neurotechnology program focused on research technology for mixed using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Karavela AI official website",
        "url": "https://karavela.ai/",
        "publisher": "Karavela AI",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-pixyl",
    "companySlug": "pixyl",
    "name": "PIXYL tracked neurotechnology program",
    "focus": "Multi-indication technology for clinicians",
    "modality": "(f)MRI",
    "statusLabel": "FDA cleared (510k); Neuroimaging profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "PIXYL is retained as a source-backed European neurotechnology program focused on multi-indication technology for clinicians using (f)mri.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "PIXYL official website",
        "url": "https://pixyl.ai/",
        "publisher": "PIXYL",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-seenel-imaging",
    "companySlug": "seenel-imaging",
    "name": "Seenel Imaging tracked neurotechnology program",
    "focus": "multimodal brain-imaging systems.",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Seenel Imaging is retained as a source-backed European neurotechnology program focused on multimodal brain-imaging systems. using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Seenel Imaging official website",
        "url": "https://seenel-imaging.com/",
        "publisher": "Seenel Imaging",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-sonomind",
    "companySlug": "sonomind",
    "name": "SonoMind tracked neurotechnology program",
    "focus": "Psychiatry technology for patients",
    "modality": "Ultrasound",
    "statusLabel": "Investigational; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "SonoMind is retained as a source-backed European neurotechnology program focused on psychiatry technology for patients using ultrasound.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "SonoMind official website",
        "url": "https://www.sonomind.com/",
        "publisher": "SonoMind",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-therasonic",
    "companySlug": "therasonic",
    "name": "TheraSonic tracked neurotechnology program",
    "focus": "Other technology for pharma",
    "modality": "Ultrasound",
    "statusLabel": "Preclinical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "TheraSonic is retained as a source-backed European neurotechnology program focused on other technology for pharma using ultrasound.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "TheraSonic official website",
        "url": "https://www.therasonic.fr/",
        "publisher": "TheraSonic",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-wisear",
    "companySlug": "wisear",
    "name": "Wisear tracked neurotechnology program",
    "focus": "Wellness technology for consumers",
    "modality": "EEG",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Wisear is retained as a source-backed European neurotechnology program focused on wellness technology for consumers using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Wisear official website",
        "url": "https://www.wisear.io/",
        "publisher": "Wisear",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-yneuro",
    "companySlug": "yneuro",
    "name": "Yneuro tracked neurotechnology program",
    "focus": "Other technology for developers",
    "modality": "Software",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Yneuro is retained as a source-backed European neurotechnology program focused on other technology for developers using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Yneuro official website",
        "url": "http://www.yneuro.com/",
        "publisher": "Yneuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-bee-medic",
    "companySlug": "bee-medic",
    "name": "BEE Medic tracked neurotechnology program",
    "focus": "EEG and neurofeedback equipment for clinics and research.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BEE Medic is retained as a source-backed European neurotechnology program focused on eeg and neurofeedback equipment for clinics and research. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BEE Medic official website",
        "url": "https://beemedic.com/",
        "publisher": "BEE Medic",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-deepspin",
    "companySlug": "deepspin",
    "name": "DeepSpin tracked neurotechnology program",
    "focus": "General brain health technology for clinicians",
    "modality": "(f)MRI",
    "statusLabel": "Investigational; Neuroimaging profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "DeepSpin is retained as a source-backed European neurotechnology program focused on general brain health technology for clinicians using (f)mri.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "DeepSpin official website",
        "url": "https://deepspin.io/",
        "publisher": "DeepSpin",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-evocal-health",
    "companySlug": "evocal-health",
    "name": "EVOCAL Health tracked neurotechnology program",
    "focus": "Multi-indication technology for pharma",
    "modality": "Biomarkers",
    "statusLabel": "Investigational; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "EVOCAL Health is retained as a source-backed European neurotechnology program focused on multi-indication technology for pharma using biomarkers.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "EVOCAL Health official website",
        "url": "https://www.evocalhealth.com/",
        "publisher": "EVOCAL Health",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-implex",
    "companySlug": "implex",
    "name": "Implex tracked neurotechnology program",
    "focus": "Reported continuous seizure recording and epilepsy-management evidence generation",
    "modality": "Reported long-term EEG monitoring implants and epilepsy systems",
    "statusLabel": "Historical catalog lead; the listed domain was unavailable and a current operating identity was not independently corroborated in the August 2026 audit",
    "evidenceLevel": "E0",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Implex is retained as an explicitly unverified historical catalog lead. The August 2026 audit could not corroborate a current operating identity or reach the listed domain.",
    "demonstrated": "Nothing beyond the existence of the prior catalog lead was verified in this pass.",
    "notYetShown": "Current operations, the reported device program, clinical evidence, and company status remain unverified. Do not treat this record as evidence that the organization is active.",
    "sourceLinks": [
      {
        "title": "Implex official technology / product information",
        "url": "https://implex-medical.com/",
        "publisher": "Implex",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-insellar",
    "companySlug": "insellar",
    "name": "Insellar tracked neurotechnology program",
    "focus": "Psychiatry technology for patients",
    "modality": "DBS",
    "statusLabel": "Preclinical; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Insellar is retained as a source-backed European neurotechnology program focused on psychiatry technology for patients using dbs.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Insellar official website",
        "url": "https://www.insellar.com/",
        "publisher": "Insellar",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-mentalab-explore",
    "companySlug": "mentalab-explore",
    "name": "Mentalab Explore tracked neurotechnology program",
    "focus": "Mobile EEG research, BCI and neurofeedback systems, motor-imagery/SSVEP examples, hyperscanning, and real-time neurointerfaces",
    "modality": "Mobile EEG/ExG amplifiers, open APIs, Lab Streaming Layer support, and wireless timing/synchronization tools",
    "statusLabel": "Commercial mobile EEG research platform with BCI and neurofeedback workflows",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Mentalab Explore is retained as a source-backed European neurotechnology program focused on mobile eeg research, bci and neurofeedback systems, motor-imagery/ssvep examples, hyperscanning, and real-time neurointerfaces using mobile eeg/exg amplifiers, open apis, lab streaming layer support, and wireless timing/synchronization tools.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Mentalab BCI and neurofeedback page",
        "url": "https://mentalab.com/mobile-eeg-for-brain-computer-interface-bci-and-neurofeedback/",
        "publisher": "Mentalab",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-munevo",
    "companySlug": "munevo",
    "name": "Munevo tracked neurotechnology program",
    "focus": "Independent mobility and assistive device control for people with motor impairments",
    "modality": "Smart-glasses head-control interface for powered wheelchairs",
    "statusLabel": "Commercial assistive-interface company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Munevo is retained as a source-backed European neurotechnology program focused on independent mobility and assistive device control for people with motor impairments using smart-glasses head-control interface for powered wheelchairs.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Munevo official technology / product information",
        "url": "https://www.munevo.com/",
        "publisher": "Munevo",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nirx",
    "companySlug": "nirx",
    "name": "NIRx tracked neurotechnology program",
    "focus": "Portable optical neuroimaging for cognitive and BCI research",
    "modality": "Functional near-infrared spectroscopy brain-imaging systems",
    "statusLabel": "Established fNIRS technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NIRx is retained as a source-backed European neurotechnology program focused on portable optical neuroimaging for cognitive and bci research using functional near-infrared spectroscopy brain-imaging systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NIRx official technology / product information",
        "url": "https://nirx.de/",
        "publisher": "NIRx",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nirx-fnirs",
    "companySlug": "nirx-fnirs",
    "name": "NIRx fNIRS tracked neurotechnology program",
    "focus": "fNIRS BCI, neurofeedback, mobile neuroimaging, multimodal EEG/fNIRS studies, and hemodynamic signal acquisition",
    "modality": "Wearable and lab-based fNIRS systems with real-time Turbo-Satori BCI/neurofeedback workflows",
    "statusLabel": "Commercial fNIRS platform with explicit BCI/neurofeedback software support and peer-reviewed Turbo-Satori paper",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NIRx fNIRS is retained as a source-backed European neurotechnology program focused on fnirs bci, neurofeedback, mobile neuroimaging, multimodal eeg/fnirs studies, and hemodynamic signal acquisition using wearable and lab-based fnirs systems with real-time turbo-satori bci/neurofeedback workflows.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NIRx BCI and neurofeedback page",
        "url": "https://nirx.net/fnirs-bci-neurofeedback",
        "publisher": "NIRx",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nuuron",
    "companySlug": "nuuron",
    "name": "Nuuron tracked neurotechnology program",
    "focus": "Dementia/impairment technology for patients",
    "modality": "Light/sound",
    "statusLabel": "Investigational; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Nuuron is retained as a source-backed European neurotechnology program focused on dementia/impairment technology for patients using light/sound.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Nuuron official website",
        "url": "https://www.nuuron.com/",
        "publisher": "Nuuron",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-precisis",
    "companySlug": "precisis",
    "name": "Precisis tracked neurotechnology program",
    "focus": "Epilepsy neuromodulation and seizure management",
    "modality": "Minimally invasive cortical stimulation system",
    "statusLabel": "Implantable neurostimulation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Precisis is retained as a source-backed European neurotechnology program focused on epilepsy neuromodulation and seizure management using minimally invasive cortical stimulation system.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Precisis official technology / product information",
        "url": "https://precisis.de/",
        "publisher": "Precisis",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-pupil-labs",
    "companySlug": "pupil-labs",
    "name": "Pupil Labs tracked neurotechnology program",
    "focus": "research eye-tracking hardware and software.",
    "modality": "Eye tracking or pupillometry",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Pupil Labs is retained as a source-backed European neurotechnology program focused on research eye-tracking hardware and software. using eye tracking or pupillometry.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Pupil Labs official website",
        "url": "https://pupil-labs.com/",
        "publisher": "Pupil Labs",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-sync2brain",
    "companySlug": "sync2brain",
    "name": "sync2brain tracked neurotechnology program",
    "focus": "TMS timed to a person's live brain activity.",
    "modality": "Transcranial magnetic stimulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "sync2brain is retained as a source-backed European neurotechnology program focused on tms timed to a person's live brain activity. using transcranial magnetic stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "sync2brain official website",
        "url": "https://sync2brain.com/",
        "publisher": "sync2brain",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-tvns-technologies",
    "companySlug": "tvns-technologies",
    "name": "tVNS Technologies tracked neurotechnology program",
    "focus": "Non-invasive autonomic and neurological neuromodulation research",
    "modality": "Transcutaneous vagus-nerve stimulation devices",
    "statusLabel": "Commercial wearable neurostimulation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "tVNS Technologies is retained as a source-backed European neurotechnology program focused on non-invasive autonomic and neurological neuromodulation research using transcutaneous vagus-nerve stimulation devices.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "tVNS Technologies official technology / product information",
        "url": "https://t-vns.com/",
        "publisher": "tVNS Technologies",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-zenowell",
    "companySlug": "zenowell",
    "name": "ZenoWell tracked neurotechnology program",
    "focus": "General brain health technology for consumers",
    "modality": "VNS",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "ZenoWell is retained as a source-backed European neurotechnology program focused on general brain health technology for consumers using vns.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "ZenoWell official website",
        "url": "https://zenowell.ai/",
        "publisher": "ZenoWell",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-mindrove",
    "companySlug": "mindrove",
    "name": "MindRove tracked neurotechnology program",
    "focus": "Research technology for mixed",
    "modality": "EMG",
    "statusLabel": "Non-medical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "MindRove is retained as a source-backed European neurotechnology program focused on research technology for mixed using emg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "MindRove official website",
        "url": "https://mindrove.com/",
        "publisher": "MindRove",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neunos",
    "companySlug": "neunos",
    "name": "Neunos tracked neurotechnology program",
    "focus": "Epilepsy technology for patients",
    "modality": "Intracortical",
    "statusLabel": "Investigational; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neunos is retained as a source-backed European neurotechnology program focused on epilepsy technology for patients using intracortical.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neunos official website",
        "url": "http://www.neunos.com/",
        "publisher": "Neunos",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-ossur",
    "companySlug": "ossur",
    "name": "Ossur tracked neurotechnology program",
    "focus": "Upper- and lower-limb assistive control and rehabilitation",
    "modality": "Bionic prosthetics, orthotics, and mobility technology",
    "statusLabel": "Major assistive-device company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Ossur is retained as a source-backed European neurotechnology program focused on upper- and lower-limb assistive control and rehabilitation using bionic prosthetics, orthotics, and mobility technology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Ossur official technology / product information",
        "url": "https://www.ossur.com/",
        "publisher": "Ossur",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-bionit-labs",
    "companySlug": "bionit-labs",
    "name": "BionIT Labs tracked neurotechnology program",
    "focus": "muscle-controlled bionic hands.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BionIT Labs is retained as a source-backed European neurotechnology program focused on muscle-controlled bionic hands. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BionIT Labs official website",
        "url": "https://bionitlabs.com/",
        "publisher": "BionIT Labs",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-eb-neuro",
    "companySlug": "eb-neuro",
    "name": "EB Neuro tracked neurotechnology program",
    "focus": "Clinical EEG, EMG, and neurophysiology systems",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "EB Neuro is retained as a source-backed European neurotechnology program focused on clinical eeg, emg, and neurophysiology systems using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "EB Neuro official website",
        "url": "http://www.ebneuro.com/",
        "publisher": "EB Neuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-manava-plus",
    "companySlug": "manava-plus",
    "name": "Manava Plus tracked neurotechnology program",
    "focus": "Paralysis/motor technology for patients",
    "modality": "SCS",
    "statusLabel": "Preclinical; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Manava Plus is retained as a source-backed European neurotechnology program focused on paralysis/motor technology for patients using scs.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Manava Plus official website",
        "url": "https://manava.plus/",
        "publisher": "Manava Plus",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuromed",
    "companySlug": "neuromed",
    "name": "Neuromed tracked neurotechnology program",
    "focus": "Neuromed is an Italian medical device company specializing in implantable spinal cord stimulation and deep brain stimulation systems for chronic pain and movement disorders. Their Ares DBS and SCS platforms are distributed across European clinical centers.",
    "modality": "Implanted neural recording or stimulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neuromed is retained as a source-backed European neurotechnology program focused on neuromed is an italian medical device company specializing in implantable spinal cord stimulation and deep brain stimulation systems for chronic pain and movement disorders. their ares dbs and scs platforms are distributed across european clinical centers. using implanted neural recording or stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neuromed official website",
        "url": "https://neuromed.us",
        "publisher": "Neuromed",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-quanta-system-neuro",
    "companySlug": "quanta-system-neuro",
    "name": "Quanta System Neuro tracked neurotechnology program",
    "focus": "Quanta System develops laser-based neurosurgical and neuromodulation platforms used in minimally invasive brain and spine procedures worldwide.",
    "modality": "Neurosurgical or neurovascular technology",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Quanta System Neuro is retained as a source-backed European neurotechnology program focused on quanta system develops laser-based neurosurgical and neuromodulation platforms used in minimally invasive brain and spine procedures worldwide. using neurosurgical or neurovascular technology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Quanta System Neuro official website",
        "url": "https://quantasystem.com",
        "publisher": "Quanta System Neuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-vibre",
    "companySlug": "vibre",
    "name": "VIBRE tracked neurotechnology program",
    "focus": "wearable EEG and software for tracking attention, fatigue and drowsiness.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "VIBRE is retained as a source-backed European neurotechnology program focused on wearable eeg and software for tracking attention, fatigue and drowsiness. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "VIBRE official website",
        "url": "https://vibre.io/",
        "publisher": "VIBRE",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-wise",
    "companySlug": "wise",
    "name": "WISE tracked neurotechnology program",
    "focus": "Tumors technology for clinicians",
    "modality": "ECoG",
    "statusLabel": "FDA cleared (510k); Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "WISE is retained as a source-backed European neurotechnology program focused on tumors technology for clinicians using ecog.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "WISE official website",
        "url": "https://wiseneuro.com/",
        "publisher": "WISE",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-birgermind",
    "companySlug": "birgermind",
    "name": "BirgerMind tracked neurotechnology program",
    "focus": "non-invasive communication BCI for people with severe motor impairment.",
    "modality": "Brain-computer interface (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BirgerMind is retained as a source-backed European neurotechnology program focused on non-invasive communication bci for people with severe motor impairment. using brain-computer interface (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BirgerMind official website",
        "url": "https://birgermind.com/",
        "publisher": "BirgerMind",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurotechnology-lithuania",
    "companySlug": "neurotechnology-lithuania",
    "name": "Neurotechnology tracked neurotechnology program",
    "focus": "Signal-processing infrastructure for neurotechnology and developer research",
    "modality": "Biometrics, brainwave analysis, and EEG software development tools",
    "statusLabel": "Established software and biometrics company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neurotechnology is retained as a source-backed European neurotechnology program focused on signal-processing infrastructure for neurotechnology and developer research using biometrics, brainwave analysis, and eeg software development tools.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neurotechnology official technology / product information",
        "url": "https://www.neurotechnology.com/",
        "publisher": "Neurotechnology",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-pulsetto",
    "companySlug": "pulsetto",
    "name": "Pulsetto tracked neurotechnology program",
    "focus": "Stress and sleep support through non-invasive peripheral stimulation",
    "modality": "Consumer vagus-nerve stimulation wearable",
    "statusLabel": "Consumer neurotechnology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Pulsetto is retained as a source-backed European neurotechnology program focused on stress and sleep support through non-invasive peripheral stimulation using consumer vagus-nerve stimulation wearable.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Pulsetto official technology / product information",
        "url": "https://pulsetto.tech/",
        "publisher": "Pulsetto",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-ant-neuro-eego",
    "companySlug": "ant-neuro-eego",
    "name": "ANT Neuro eego tracked neurotechnology program",
    "focus": "Real-time BCI, neurofeedback, neurorehabilitation, high-density EEG research, and mobile EEG studies",
    "modality": "Research-grade EEG amplifiers, EEG caps, high-density EEG systems, and real-time eego rt BCI hardware",
    "statusLabel": "Commercial research and clinical EEG platform; eego rt is positioned for BCI and neurofeedback",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "ANT Neuro eego is retained as a source-backed European neurotechnology program focused on real-time bci, neurofeedback, neurorehabilitation, high-density eeg research, and mobile eeg studies using research-grade eeg amplifiers, eeg caps, high-density eeg systems, and real-time eego rt bci hardware.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "eego rt product page",
        "url": "https://www.ant-neuro.com/products/eego-rt",
        "publisher": "ANT Neuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-artinis-brite",
    "companySlug": "artinis-brite",
    "name": "Artinis Brite / OxyMon tracked neurotechnology program",
    "focus": "fNIRS BCI, neurofeedback, neurorehabilitation research, cognitive workload, and hybrid EEG/fNIRS studies",
    "modality": "Wearable and lab-based fNIRS/NIRS systems with EEG-fNIRS integration options",
    "statusLabel": "Commercial fNIRS research hardware; BCI relevance documented in company application notes",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Artinis Brite / OxyMon is retained as a source-backed European neurotechnology program focused on fnirs bci, neurofeedback, neurorehabilitation research, cognitive workload, and hybrid eeg/fnirs studies using wearable and lab-based fnirs/nirs systems with eeg-fnirs integration options.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Artinis fNIRS in BCI and neurofeedback",
        "url": "https://artinis.com/blogpost-all/fnirs-in-brain-computer-interface-and-neurofeedback",
        "publisher": "Artinis",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-artinis-medical-systems",
    "companySlug": "artinis-medical-systems",
    "name": "Artinis Medical Systems tracked neurotechnology program",
    "focus": "Functional brain and muscle monitoring for research and clinical studies",
    "modality": "fNIRS and diffuse optical brain-monitoring systems",
    "statusLabel": "Established optical-neuroimaging supplier",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Artinis Medical Systems is retained as a source-backed European neurotechnology program focused on functional brain and muscle monitoring for research and clinical studies using fnirs and diffuse optical brain-monitoring systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Artinis Medical Systems official technology / product information",
        "url": "https://www.artinis.com/",
        "publisher": "Artinis Medical Systems",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-biosemi",
    "companySlug": "biosemi",
    "name": "BioSemi tracked neurotechnology program",
    "focus": "high-channel-count EEG and biopotential recording systems.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BioSemi is retained as a source-backed European neurotechnology program focused on high-channel-count eeg and biopotential recording systems. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BioSemi official website",
        "url": "https://www.biosemi.com/",
        "publisher": "BioSemi",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-mind-media",
    "companySlug": "mind-media",
    "name": "Mind Media tracked neurotechnology program",
    "focus": "Clinical and research brain-state feedback workflows",
    "modality": "EEG neurofeedback and psychophysiology systems",
    "statusLabel": "Established neurofeedback technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Mind Media is retained as a source-backed European neurotechnology program focused on clinical and research brain-state feedback workflows using eeg neurofeedback and psychophysiology systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Mind Media official technology / product information",
        "url": "https://mindmedia.com/",
        "publisher": "Mind Media",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-motek-medical",
    "companySlug": "motek-medical",
    "name": "Motek Medical tracked neurotechnology program",
    "focus": "gait analysis and immersive rehabilitation systems.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Motek Medical is retained as a source-backed European neurotechnology program focused on gait analysis and immersive rehabilitation systems. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Motek Medical official website",
        "url": "https://motekmedical.com/",
        "publisher": "Motek Medical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nemo-healthcare",
    "companySlug": "nemo-healthcare",
    "name": "NEMO Healthcare tracked neurotechnology program",
    "focus": "Prenatal and clinical monitoring; adjacent biosignal technology rather than BCI control",
    "modality": "Non-invasive electrophysiology monitoring and AI signal analysis",
    "statusLabel": "Commercial clinical-monitoring company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NEMO Healthcare is retained as a source-backed European neurotechnology program focused on prenatal and clinical monitoring; adjacent biosignal technology rather than bci control using non-invasive electrophysiology monitoring and ai signal analysis.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NEMO Healthcare official technology / product information",
        "url": "https://nemohealthcare.com/",
        "publisher": "NEMO Healthcare",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurocast",
    "companySlug": "neurocast",
    "name": "Neurocast tracked neurotechnology program",
    "focus": "Multi-indication technology for mixed",
    "modality": "Software",
    "statusLabel": "Investigational; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neurocast is retained as a source-backed European neurotechnology program focused on multi-indication technology for mixed using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neurocast official website",
        "url": "https://www.neurocast.ai/",
        "publisher": "Neurocast",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nimbus",
    "companySlug": "nimbus",
    "name": "Nimbus tracked neurotechnology program",
    "focus": "Research technology for developers",
    "modality": "Software",
    "statusLabel": "Research only; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Nimbus is retained as a source-backed European neurotechnology program focused on research technology for developers using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Nimbus official website",
        "url": "https://nimbusbci.com/",
        "publisher": "Nimbus",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-noldus",
    "companySlug": "noldus",
    "name": "Noldus Information Technology tracked neurotechnology program",
    "focus": "Quantifying behavior and cognitive interaction in neuroscience research",
    "modality": "Behavioral research, eye-tracking, and human-observation technology",
    "statusLabel": "Established research-technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Noldus Information Technology is retained as a source-backed European neurotechnology program focused on quantifying behavior and cognitive interaction in neuroscience research using behavioral research, eye-tracking, and human-observation technology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Noldus Information Technology official technology / product information",
        "url": "https://www.noldus.com/",
        "publisher": "Noldus Information Technology",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-onera-health",
    "companySlug": "onera-health",
    "name": "Onera Health tracked neurotechnology program",
    "focus": "patch-based home sleep diagnostics.",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Onera Health is retained as a source-backed European neurotechnology program focused on patch-based home sleep diagnostics. using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Onera Health official website",
        "url": "https://onerahealth.com/",
        "publisher": "Onera Health",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-philips-neuro",
    "companySlug": "philips-neuro",
    "name": "Philips Neuro tracked neurotechnology program",
    "focus": "Philips Neuro, a division of Royal Philips, offers a comprehensive portfolio of EEG systems, long-term monitoring solutions, and diagnostic neurology software used in hospital neurology departments and ICUs worldwide. Their Alice and Natus-integrated platforms support epilepsy monitoring, sleep studies, and intraoperative neuromonitoring.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Philips Neuro is retained as a source-backed European neurotechnology program focused on philips neuro, a division of royal philips, offers a comprehensive portfolio of eeg systems, long-term monitoring solutions, and diagnostic neurology software used in hospital neurology departments and icus worldwide. their alice and natus-integrated platforms support epilepsy monitoring, sleep studies, and intraoperative neuromonitoring. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Philips Neuro official website",
        "url": "https://www.philips.com/healthcare/solutions/neurology",
        "publisher": "Philips Neuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-purple-gaze",
    "companySlug": "purple-gaze",
    "name": "Purple Gaze tracked neurotechnology program",
    "focus": "General brain health technology for researchers",
    "modality": "Biomarkers",
    "statusLabel": "Research only; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Purple Gaze is retained as a source-backed European neurotechnology program focused on general brain health technology for researchers using biomarkers.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Purple Gaze official website",
        "url": "http://purplegaze.io/",
        "publisher": "Purple Gaze",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-tmsi",
    "companySlug": "tmsi",
    "name": "TMSi tracked neurotechnology program",
    "focus": "Neuroscience, BCI, and clinical-research signal capture",
    "modality": "Research-grade EEG, EMG, and biosignal acquisition systems",
    "statusLabel": "Established neurophysiology hardware company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "TMSi is retained as a source-backed European neurotechnology program focused on neuroscience, bci, and clinical-research signal capture using research-grade eeg, emg, and biosignal acquisition systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "TMSi official technology / product information",
        "url": "https://www.tmsi.com/",
        "publisher": "TMSi",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-zander-labs",
    "companySlug": "zander-labs",
    "name": "Zander Labs tracked neurotechnology program",
    "focus": "Research technology for mixed",
    "modality": "EEG",
    "statusLabel": "Non-medical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Zander Labs is retained as a source-backed European neurotechnology program focused on research technology for mixed using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Zander Labs official website",
        "url": "https://www.zanderlabs.com/",
        "publisher": "Zander Labs",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nordicneurolab",
    "companySlug": "nordicneurolab",
    "name": "NordicNeuroLab tracked neurotechnology program",
    "focus": "functional MRI hardware and software used in clinical and research settings.",
    "modality": "Functional magnetic-resonance neuroimaging",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NordicNeuroLab is retained as a source-backed European neurotechnology program focused on functional mri hardware and software used in clinical and research settings. using functional magnetic-resonance neuroimaging.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NordicNeuroLab official website",
        "url": "https://nordicneurolab.com/",
        "publisher": "NordicNeuroLab",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainscan-ai",
    "companySlug": "brainscan-ai",
    "name": "BrainScan tracked neurotechnology program",
    "focus": "Neurological image triage and decision support",
    "modality": "AI brain CT/MRI image analysis software",
    "statusLabel": "CE-marked neuroimaging software listed by NeuroFounders",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BrainScan is retained as a source-backed European neurotechnology program focused on neurological image triage and decision support using ai brain ct/mri image analysis software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BrainScan official technology / product information",
        "url": "https://www.brainscan.ai/",
        "publisher": "BrainScan",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-cortivision-photon",
    "companySlug": "cortivision-photon",
    "name": "Cortivision Photon tracked neurotechnology program",
    "focus": "fNIRS BCI studies, hybrid EEG/fNIRS research, VR/mobile neuroimaging, and microgravity human-computer-interaction experiments",
    "modality": "Wireless fNIRS systems, Photon Cap, Spectrum, and fNIRS-plus-EEG integrations",
    "statusLabel": "Commercial fNIRS research platform; company-announced PhotonGrav fNIRS-BCI experiment on the ISS",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cortivision Photon is retained as a source-backed European neurotechnology program focused on fnirs bci studies, hybrid eeg/fnirs research, vr/mobile neuroimaging, and microgravity human-computer-interaction experiments using wireless fnirs systems, photon cap, spectrum, and fnirs-plus-eeg integrations.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cortivision BCI use case",
        "url": "https://www.cortivision.com/use-case/brain-computer-interfaces-bci/",
        "publisher": "Cortivision",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuroplay",
    "companySlug": "neuroplay",
    "name": "Neuroplay tracked neurotechnology program",
    "focus": "EEG neurofeedback for healthy ageing and stroke recovery.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neuroplay is retained as a source-backed European neurotechnology program focused on eeg neurofeedback for healthy ageing and stroke recovery. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neuroplay official website",
        "url": "https://neuroplay.pl/",
        "publisher": "Neuroplay",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-solvemed",
    "companySlug": "solvemed",
    "name": "Solvemed tracked neurotechnology program",
    "focus": "Camera-based pupillometry for neurological assessment",
    "modality": "Eye tracking or pupillometry",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Solvemed is retained as a source-backed European neurotechnology program focused on camera-based pupillometry for neurological assessment using eye tracking or pupillometry.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Solvemed official website",
        "url": "https://solvemed.ai/",
        "publisher": "Solvemed",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neroes",
    "companySlug": "neroes",
    "name": "Neroes tracked neurotechnology program",
    "focus": "EEG neurofeedback used for performance and wellbeing.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neroes is retained as a source-backed European neurotechnology program focused on eeg neurofeedback used for performance and wellbeing. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neroes official website",
        "url": "https://neroes.tech/",
        "publisher": "Neroes",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuroinova",
    "companySlug": "neuroinova",
    "name": "Neuroinova tracked neurotechnology program",
    "focus": "digital cognitive monitoring and rehabilitation.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neuroinova is retained as a source-backed European neurotechnology program focused on digital cognitive monitoring and rehabilitation. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neuroinova official website",
        "url": "https://neuroinova.com/",
        "publisher": "Neuroinova",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-plux-biosignals",
    "companySlug": "plux-biosignals",
    "name": "PLUX Biosignals tracked neurotechnology program",
    "focus": "EEG, EMG, and biosignal acquisition systems for research",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "PLUX Biosignals is retained as a source-backed European neurotechnology program focused on eeg, emg, and biosignal acquisition systems for research using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "PLUX Biosignals official website",
        "url": "https://pluxbiosignals.com/",
        "publisher": "PLUX Biosignals",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-intelimensa",
    "companySlug": "intelimensa",
    "name": "Intelimensa tracked neurotechnology program",
    "focus": "non-invasive brain-computer interfaces for assistive and consumer use.",
    "modality": "Brain-computer interface (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Intelimensa is retained as a source-backed European neurotechnology program focused on non-invasive brain-computer interfaces for assistive and consumer use. using brain-computer interface (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Intelimensa official website",
        "url": "https://intelimensa.com/",
        "publisher": "Intelimensa",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurorevive",
    "companySlug": "neurorevive",
    "name": "NeuroReVive tracked neurotechnology program",
    "focus": "sensor-driven hand orthosis for home and clinic rehabilitation.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroReVive is retained as a source-backed European neurotechnology program focused on sensor-driven hand orthosis for home and clinic rehabilitation. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroReVive official website",
        "url": "https://neurorevive.eu/",
        "publisher": "NeuroReVive",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-bitronics-lab",
    "companySlug": "bitronics-lab",
    "name": "BiTronics Lab tracked neurotechnology program",
    "focus": "Teaching and prototyping neurotechnology and biosignal interfaces",
    "modality": "Educational EEG, EMG, biosignal, and human-machine-interaction kits",
    "statusLabel": "Commercial educational neurotechnology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BiTronics Lab is retained as a source-backed European neurotechnology program focused on teaching and prototyping neurotechnology and biosignal interfaces using educational eeg, emg, biosignal, and human-machine-interaction kits.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BiTronics Lab neurotechnology education portfolio",
        "url": "https://bitronicslab.com/en/",
        "publisher": "BiTronics Lab",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neiry",
    "companySlug": "neiry",
    "name": "Neiry tracked neurotechnology program",
    "focus": "Brain-state monitoring, device control, and preclinical bidirectional BCI research",
    "modality": "Consumer EEG systems plus preclinical invasive neural interfaces and stimulation",
    "statusLabel": "Commercial non-invasive products; invasive work remains preclinical or company-announced",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neiry is retained as a source-backed European neurotechnology program focused on brain-state monitoring, device control, and preclinical bidirectional bci research using consumer eeg systems plus preclinical invasive neural interfaces and stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neiry technology portfolio",
        "url": "https://neiry.ru/en",
        "publisher": "Neiry",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurobotics-russia",
    "companySlug": "neurobotics-russia",
    "name": "Neurobotics tracked neurotechnology program",
    "focus": "Non-invasive neural control, biofeedback, education, and assistive-device research",
    "modality": "Dry-electrode EEG headsets, BCI software, neurorehabilitation, and assistive robotics",
    "statusLabel": "Established BCI and neurophysiology equipment company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neurobotics is retained as a source-backed European neurotechnology program focused on non-invasive neural control, biofeedback, education, and assistive-device research using dry-electrode eeg headsets, bci software, neurorehabilitation, and assistive robotics.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neurobotics neurophysiology and BCI portfolio",
        "url": "https://neurobotics.ru/en/",
        "publisher": "Neurobotics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurochat-russia",
    "companySlug": "neurochat-russia",
    "name": "NeuroChat tracked neurotechnology program",
    "focus": "Text entry and digital communication for people with severe speech and motor impairment",
    "modality": "P300 EEG communication and neurotraining platform",
    "statusLabel": "Commercial EEG communication system with published pilot research",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroChat is retained as a source-backed European neurotechnology program focused on text entry and digital communication for people with severe speech and motor impairment using p300 eeg communication and neurotraining platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroChat official system history and demonstration",
        "url": "https://neuro.chat/en/",
        "publisher": "NeuroChat",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurotech-smc",
    "companySlug": "neurotech-smc",
    "name": "SMC Neurotech tracked neurotechnology program",
    "focus": "Electrophysiology diagnostics and biofeedback-supported neurological rehabilitation",
    "modality": "Clinical EEG, EMG, evoked-potential, biofeedback, and rehabilitation systems",
    "statusLabel": "Established Russian medical-device manufacturer",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "SMC Neurotech is retained as a source-backed European neurotechnology program focused on electrophysiology diagnostics and biofeedback-supported neurological rehabilitation using clinical eeg, emg, evoked-potential, biofeedback, and rehabilitation systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "SMC Neurotech official company history",
        "url": "https://neurotech.ru/en/about/",
        "publisher": "SMC Neurotech",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-mbraintrain-smarting",
    "companySlug": "mbraintrain-smarting",
    "name": "mBrainTrain Smarting tracked neurotechnology program",
    "focus": "Mobile EEG, hyperscanning, cognitive neuroscience, auditory and movement studies, and BCI-enabling raw EEG streaming",
    "modality": "Wireless mobile EEG systems including Smarting S and Smarting PRO for real-world EEG research",
    "statusLabel": "Commercial mobile EEG research platform",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "mBrainTrain Smarting is retained as a source-backed European neurotechnology program focused on mobile eeg, hyperscanning, cognitive neuroscience, auditory and movement studies, and bci-enabling raw eeg streaming using wireless mobile eeg systems including smarting s and smarting pro for real-world eeg research.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Smarting wireless EEG page",
        "url": "https://mbraintrain.com/smarting-wireless-eeg/",
        "publisher": "mBrainTrain",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nion-neuroscience",
    "companySlug": "nion-neuroscience",
    "name": "NION Neuroscience tracked neurotechnology program",
    "focus": "consumer brain-stimulation device.",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NION Neuroscience is retained as a source-backed European neurotechnology program focused on consumer brain-stimulation device. using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NION Neuroscience official website",
        "url": "https://nionneuroscience.com/",
        "publisher": "NION Neuroscience",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-braintrip",
    "companySlug": "braintrip",
    "name": "BrainTrip tracked neurotechnology program",
    "focus": "Cognitive impairment and dementia screening from EEG markers",
    "modality": "EEG dementia-screening software",
    "statusLabel": "CE-marked EEG diagnostic software profile listed by NeuroFounders",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BrainTrip is retained as a source-backed European neurotechnology program focused on cognitive impairment and dementia screening from eeg markers using eeg dementia-screening software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BrainTrip official technology / product information",
        "url": "https://braintrip.net/",
        "publisher": "BrainTrip",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-kinestica",
    "companySlug": "kinestica",
    "name": "Kinestica tracked neurotechnology program",
    "focus": "movement training and neurorehabilitation devices.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Kinestica is retained as a source-backed European neurotechnology program focused on movement training and neurorehabilitation devices. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Kinestica official website",
        "url": "https://kinestica.com/",
        "publisher": "Kinestica",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-connectoma-neurotech",
    "companySlug": "connectoma-neurotech",
    "name": "Connectoma Neurotech tracked neurotechnology program",
    "focus": "Personalized psychiatry neuromodulation",
    "modality": "TMS and computational neuromodulation software",
    "statusLabel": "Early non-invasive neuromodulation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Connectoma Neurotech is retained as a source-backed European neurotechnology program focused on personalized psychiatry neuromodulation using tms and computational neuromodulation software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Connectoma Neurotech official technology / product information",
        "url": "https://www.connectoma.com",
        "publisher": "Connectoma Neurotech",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-corify-care",
    "companySlug": "corify-care",
    "name": "Corify Care tracked neurotechnology program",
    "focus": "Cardiac electrophysiology mapping; adjacent bioelectric-signal infrastructure rather than a BCI",
    "modality": "Non-invasive electrocardiographic imaging and signal analysis",
    "statusLabel": "Commercial clinical signal-mapping company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Corify Care is retained as a source-backed European neurotechnology program focused on cardiac electrophysiology mapping; adjacent bioelectric-signal infrastructure rather than a bci using non-invasive electrocardiographic imaging and signal analysis.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Corify Care official technology / product information",
        "url": "https://corify.care/",
        "publisher": "Corify Care",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-spinally",
    "companySlug": "spinally",
    "name": "Spinally tracked neurotechnology program",
    "focus": "Pain/migraine technology for patients",
    "modality": "SCS",
    "statusLabel": "Preclinical; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Spinally is retained as a source-backed European neurotechnology program focused on pain/migraine technology for patients using scs.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Spinally official website",
        "url": "https://spinallymedical.com/",
        "publisher": "Spinally",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainlink-health",
    "companySlug": "brainlink-health",
    "name": "Brainlink Health tracked neurotechnology program",
    "focus": "long-term monitoring for pressure and shunt problems inside the skull.",
    "modality": "Neurosurgical or neurovascular technology",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Brainlink Health is retained as a source-backed European neurotechnology program focused on long-term monitoring for pressure and shunt problems inside the skull. using neurosurgical or neurovascular technology.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Brainlink Health official website",
        "url": "https://brainlink.se/",
        "publisher": "Brainlink Health",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-elekta",
    "companySlug": "elekta",
    "name": "Elekta tracked neurotechnology program",
    "focus": "Brain-tumor and functional-neurosurgery treatment infrastructure",
    "modality": "Stereotactic radiosurgery, neuro-navigation, and precision radiation systems",
    "statusLabel": "Major medical-device company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Elekta is retained as a source-backed European neurotechnology program focused on brain-tumor and functional-neurosurgery treatment infrastructure using stereotactic radiosurgery, neuro-navigation, and precision radiation systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Elekta official technology / product information",
        "url": "https://www.elekta.com/",
        "publisher": "Elekta",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-mendi",
    "companySlug": "mendi",
    "name": "Mendi tracked neurotechnology program",
    "focus": "Attention and cognitive-training measurement through optical neurofeedback",
    "modality": "fNIRS neurofeedback wearable",
    "statusLabel": "Consumer neurotechnology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Mendi is retained as a source-backed European neurotechnology program focused on attention and cognitive-training measurement through optical neurofeedback using fnirs neurofeedback wearable.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Mendi official technology / product information",
        "url": "https://mendi.io/",
        "publisher": "Mendi",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuronano",
    "companySlug": "neuronano",
    "name": "Neuronano tracked neurotechnology program",
    "focus": "flexible electrodes being developed for deep-brain stimulation.",
    "modality": "Implanted neural recording or stimulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neuronano is retained as a source-backed European neurotechnology program focused on flexible electrodes being developed for deep-brain stimulation. using implanted neural recording or stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neuronano official website",
        "url": "https://neuronano.se/",
        "publisher": "Neuronano",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-smart-eye",
    "companySlug": "smart-eye",
    "name": "Smart Eye tracked neurotechnology program",
    "focus": "Behavioral and attentional measurement that can complement accessible human-machine interfaces",
    "modality": "Eye-tracking, driver-monitoring, and human-insight systems",
    "statusLabel": "Established eye-tracking technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Smart Eye is retained as a source-backed European neurotechnology program focused on behavioral and attentional measurement that can complement accessible human-machine interfaces using eye-tracking, driver-monitoring, and human-insight systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Smart Eye official technology / product information",
        "url": "https://smarteye.se/",
        "publisher": "Smart Eye",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-tobii",
    "companySlug": "tobii",
    "name": "Tobii tracked neurotechnology program",
    "focus": "Hands-free computer access and measurement of visual attention",
    "modality": "Eye-tracking hardware, assistive control, and human-attention analytics",
    "statusLabel": "Established assistive-interface and eye-tracking company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Tobii is retained as a source-backed European neurotechnology program focused on hands-free computer access and measurement of visual attention using eye-tracking hardware, assistive control, and human-attention analytics.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Tobii official technology / product information",
        "url": "https://www.tobii.com/",
        "publisher": "Tobii",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-bearmind",
    "companySlug": "bearmind",
    "name": "Bearmind tracked neurotechnology program",
    "focus": "Helmet-integrated head-impact sensing and neurological risk monitoring",
    "modality": "Neural sensing, analysis, or stimulation (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Bearmind is retained as a source-backed European neurotechnology program focused on helmet-integrated head-impact sensing and neurological risk monitoring using neural sensing, analysis, or stimulation (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Bearmind official website",
        "url": "https://bearmind.tech/",
        "publisher": "Bearmind",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainquant",
    "companySlug": "brainquant",
    "name": "Brainquant tracked neurotechnology program",
    "focus": "Dementia and cognitive-impairment neuroimaging analytics",
    "modality": "MRI software and brain-volume quantification",
    "statusLabel": "Preclinical/early neuroimaging software company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Brainquant is retained as a source-backed European neurotechnology program focused on dementia and cognitive-impairment neuroimaging analytics using mri software and brain-volume quantification.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Brainquant official technology / product information",
        "url": "https://www.brainquant.ch",
        "publisher": "Brainquant",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brnlit-ai",
    "companySlug": "brnlit-ai",
    "name": "BRNLIT AI tracked neurotechnology program",
    "focus": "Consumer wellness and light/sound-guided mental-state support",
    "modality": "Light/sound software for cognitive and wellness applications",
    "statusLabel": "Early non-medical consumer neurotech software company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BRNLIT AI is retained as a source-backed European neurotechnology program focused on consumer wellness and light/sound-guided mental-state support using light/sound software for cognitive and wellness applications.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BRNLIT AI official technology / product information",
        "url": "https://www.brnlit.ai/en",
        "publisher": "BRNLIT AI",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-clee-medical",
    "companySlug": "clee-medical",
    "name": "Clee Medical tracked neurotechnology program",
    "focus": "Procedure support and neural-interface infrastructure",
    "modality": "Minimally invasive neurotechnology tools",
    "statusLabel": "Preclinical minimally invasive tools company with limited public detail",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Clee Medical is retained as a source-backed European neurotechnology program focused on procedure support and neural-interface infrastructure using minimally invasive neurotechnology tools.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Clee Medical official technology / product information",
        "url": "https://www.cleemedical.com/",
        "publisher": "Clee Medical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-connectome-health",
    "companySlug": "connectome-health",
    "name": "Connectome Health tracked neurotechnology program",
    "focus": "General brain-health monitoring and consumer neurotech insights",
    "modality": "fNIRS consumer brain-health wearable/software",
    "statusLabel": "Non-medical consumer fNIRS neurotech company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Connectome Health is retained as a source-backed European neurotechnology program focused on general brain-health monitoring and consumer neurotech insights using fnirs consumer brain-health wearable/software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Connectome Health official technology / product information",
        "url": "https://www.connectome.health",
        "publisher": "Connectome Health",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-deegtal",
    "companySlug": "deegtal",
    "name": "DEEGtal tracked neurotechnology program",
    "focus": "Epilepsy technology for clinicians",
    "modality": "EEG",
    "statusLabel": "Investigational; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "DEEGtal is retained as a source-backed European neurotechnology program focused on epilepsy technology for clinicians using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "DEEGtal official website",
        "url": "https://www.deegtal.ai/",
        "publisher": "DEEGtal",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-hbimed",
    "companySlug": "hbimed",
    "name": "HBImed tracked neurotechnology program",
    "focus": "EEG reference databases and clinical analysis software.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "HBImed is retained as a source-backed European neurotechnology program focused on eeg reference databases and clinical analysis software. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "HBImed official website",
        "url": "https://www.hbimed.com/en/",
        "publisher": "HBImed",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-infera-neuro",
    "companySlug": "infera-neuro",
    "name": "Infera Neuro tracked neurotechnology program",
    "focus": "low-power chips for implanted and wearable brain interfaces.",
    "modality": "Implantable or peripheral neuromodulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Infera Neuro is retained as a source-backed European neurotechnology program focused on low-power chips for implanted and wearable brain interfaces. using implantable or peripheral neuromodulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Infera Neuro official website",
        "url": "https://infera-neuro.com/",
        "publisher": "Infera Neuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-optohive",
    "companySlug": "optohive",
    "name": "Optohive tracked neurotechnology program",
    "focus": "General brain health technology for researchers",
    "modality": "fNIRS",
    "statusLabel": "Research only; Neuroimaging profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Optohive is retained as a source-backed European neurotechnology program focused on general brain health technology for researchers using fnirs.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Optohive official website",
        "url": "https://optohive.io/",
        "publisher": "Optohive",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-rhovica-neuroimaging",
    "companySlug": "rhovica-neuroimaging",
    "name": "Rhovica Neuroimaging tracked neurotechnology program",
    "focus": "Other technology for clinicians",
    "modality": "Others",
    "statusLabel": "Preclinical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Rhovica Neuroimaging is retained as a source-backed European neurotechnology program focused on other technology for clinicians using others.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Rhovica Neuroimaging official website",
        "url": "https://rhovica.com/",
        "publisher": "Rhovica Neuroimaging",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-sciencebeam",
    "companySlug": "sciencebeam",
    "name": "ScienceBeam tracked neurotechnology program",
    "focus": "EEG, TMS and neurophysiology systems.",
    "modality": "Transcranial magnetic stimulation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "ScienceBeam is retained as a source-backed European neurotechnology program focused on eeg, tms and neurophysiology systems. using transcranial magnetic stimulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "ScienceBeam official website",
        "url": "https://sciencebeam.com/",
        "publisher": "ScienceBeam",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-vagustim",
    "companySlug": "vagustim",
    "name": "Vagustim tracked neurotechnology program",
    "focus": "Wellness technology for consumers",
    "modality": "VNS",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Vagustim is retained as a source-backed European neurotechnology program focused on wellness technology for consumers using vns.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Vagustim official website",
        "url": "https://vagustim.io/",
        "publisher": "Vagustim",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-eightsix-science",
    "companySlug": "eightsix-science",
    "name": "Eightsix Science tracked neurotechnology program",
    "focus": "Multi-indication technology for clinicians",
    "modality": "Others",
    "statusLabel": "Preclinical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Eightsix Science is retained as a source-backed European neurotechnology program focused on multi-indication technology for clinicians using others.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Eightsix Science official website",
        "url": "https://eightsix.science/",
        "publisher": "Eightsix Science",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-emteq-labs",
    "companySlug": "emteq-labs",
    "name": "Emteq Labs tracked neurotechnology program",
    "focus": "Research technology for researchers",
    "modality": "Biomarkers",
    "statusLabel": "Research only; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Emteq Labs is retained as a source-backed European neurotechnology program focused on research technology for researchers using biomarkers.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Emteq Labs official website",
        "url": "https://www.emteqlabs.com/",
        "publisher": "Emteq Labs",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-kneu-health",
    "companySlug": "kneu-health",
    "name": "Kneu Health tracked neurotechnology program",
    "focus": "Parkinson's technology for clinicians",
    "modality": "Biomarkers",
    "statusLabel": "FDA cleared (510k); Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Kneu Health is retained as a source-backed European neurotechnology program focused on parkinson's technology for clinicians using biomarkers.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Kneu Health official website",
        "url": "https://kneu.com/",
        "publisher": "Kneu Health",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-machine-medicine",
    "companySlug": "machine-medicine",
    "name": "Machine Medicine tracked neurotechnology program",
    "focus": "Parkinson's technology for mixed",
    "modality": "Biomarkers",
    "statusLabel": "Research only; Diagnostics and Assessment profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Machine Medicine is retained as a source-backed European neurotechnology program focused on parkinson's technology for mixed using biomarkers.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Machine Medicine official website",
        "url": "https://machinemedicine.com/",
        "publisher": "Machine Medicine",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-mintneuro",
    "companySlug": "mintneuro",
    "name": "MintNeuro tracked neurotechnology program",
    "focus": "Multi-indication technology for mixed",
    "modality": "Intracortical",
    "statusLabel": "Research only; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "MintNeuro is retained as a source-backed European neurotechnology program focused on multi-indication technology for mixed using intracortical.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "MintNeuro official website",
        "url": "https://mintneuro.com/",
        "publisher": "MintNeuro",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-myndspan",
    "companySlug": "myndspan",
    "name": "MYndspan tracked neurotechnology program",
    "focus": "Wellness technology for consumers",
    "modality": "MEG",
    "statusLabel": "Non-medical; Neuroimaging profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "MYndspan is retained as a source-backed European neurotechnology program focused on wellness technology for consumers using meg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "MYndspan official website",
        "url": "https://myndspan.com/",
        "publisher": "MYndspan",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-netholabs",
    "companySlug": "netholabs",
    "name": "Netholabs tracked neurotechnology program",
    "focus": "Research technology for researchers",
    "modality": "Software",
    "statusLabel": "Research only; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Netholabs is retained as a source-backed European neurotechnology program focused on research technology for researchers using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Netholabs official website",
        "url": "https://netholabs.com/",
        "publisher": "Netholabs",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neupulse",
    "companySlug": "neupulse",
    "name": "Neupulse tracked neurotechnology program",
    "focus": "Neurodevelopmental technology for patients",
    "modality": "Nerve stimulator",
    "statusLabel": "Investigational; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neupulse is retained as a source-backed European neurotechnology program focused on neurodevelopmental technology for patients using nerve stimulator.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neupulse official website",
        "url": "https://www.neupulse.co/",
        "publisher": "Neupulse",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuralpulse",
    "companySlug": "neuralpulse",
    "name": "NeuralPulse tracked neurotechnology program",
    "focus": "Epilepsy technology for patients",
    "modality": "Intracortical",
    "statusLabel": "Investigational; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuralPulse is retained as a source-backed European neurotechnology program focused on epilepsy technology for patients using intracortical.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuralPulse official website",
        "url": "https://www.neural-pulse.com/",
        "publisher": "NeuralPulse",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neuroconcise",
    "companySlug": "neuroconcise",
    "name": "NeuroCONCISE tracked neurotechnology program",
    "focus": "Research technology for mixed",
    "modality": "EEG",
    "statusLabel": "Research only; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroCONCISE is retained as a source-backed European neurotechnology program focused on research technology for mixed using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroCONCISE official website",
        "url": "http://www.neuroconcise.co.uk/",
        "publisher": "NeuroCONCISE",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurox",
    "companySlug": "neurox",
    "name": "NeuroX tracked neurotechnology program",
    "focus": "Wellness technology for consumers",
    "modality": "EEG",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NeuroX is retained as a source-backed European neurotechnology program focused on wellness technology for consumers using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NeuroX official website",
        "url": "https://www.neurox.co.uk/",
        "publisher": "NeuroX",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-panda-surgical",
    "companySlug": "panda-surgical",
    "name": "Panda Surgical tracked neurotechnology program",
    "focus": "Multi-indication technology for clinicians",
    "modality": "Others",
    "statusLabel": "Preclinical; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Panda Surgical is retained as a source-backed European neurotechnology program focused on multi-indication technology for clinicians using others.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Panda Surgical official website",
        "url": "https://www.panda-surgical.com/",
        "publisher": "Panda Surgical",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-pieeg",
    "companySlug": "pieeg",
    "name": "PiEEG tracked neurotechnology program",
    "focus": "Research technology for researchers",
    "modality": "EEG",
    "statusLabel": "Research only; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "PiEEG is retained as a source-backed European neurotechnology program focused on research technology for researchers using eeg.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "PiEEG official website",
        "url": "https://pieeg.com/",
        "publisher": "PiEEG",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-prima-mente",
    "companySlug": "prima-mente",
    "name": "Prima Mente tracked neurotechnology program",
    "focus": "Dementia/impairment technology for pharma",
    "modality": "Software",
    "statusLabel": "Investigational; Tools and Infrastructure profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Prima Mente is retained as a source-backed European neurotechnology program focused on dementia/impairment technology for pharma using software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Prima Mente official website",
        "url": "https://www.primamente.com/",
        "publisher": "Prima Mente",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-qv-bioelectronics",
    "companySlug": "qv-bioelectronics",
    "name": "QV Bioelectronics tracked neurotechnology program",
    "focus": "Tumors technology for patients",
    "modality": "Others",
    "statusLabel": "Preclinical; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "QV Bioelectronics is retained as a source-backed European neurotechnology program focused on tumors technology for patients using others.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "QV Bioelectronics official website",
        "url": "http://www.qvbio.co.uk/",
        "publisher": "QV Bioelectronics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-sona",
    "companySlug": "sona",
    "name": "SONA tracked neurotechnology program",
    "focus": "Wellness technology for consumers",
    "modality": "VNS",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "SONA is retained as a source-backed European neurotechnology program focused on wellness technology for consumers using vns.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "SONA official website",
        "url": "https://sona.help/",
        "publisher": "SONA",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-esper-bionics",
    "companySlug": "esper-bionics",
    "name": "Esper Bionics tracked neurotechnology program",
    "focus": "Upper-limb prosthetic control and rehabilitation",
    "modality": "EMG-controlled robotic prosthetic hand and digital fitting platform",
    "statusLabel": "Commercial prosthetics and assistive-interface company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Esper Bionics is retained as a source-backed European neurotechnology program focused on upper-limb prosthetic control and rehabilitation using emg-controlled robotic prosthetic hand and digital fitting platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Esper Bionics official technology / product information",
        "url": "https://esperbionics.com/",
        "publisher": "Esper Bionics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-brainwavebank",
    "companySlug": "brainwavebank",
    "name": "BrainWaveBank tracked neurotechnology program",
    "focus": "Brain-state measurement and mental-health support research",
    "modality": "EEG analytics and personalized digital neurotherapy platform",
    "statusLabel": "Early digital neurotechnology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "BrainWaveBank is retained as a source-backed European neurotechnology program focused on brain-state measurement and mental-health support research using eeg analytics and personalized digital neurotherapy platform.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "BrainWaveBank official technology / product information",
        "url": "https://brainwavebank.com/",
        "publisher": "BrainWaveBank",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-cambridge-neurotech",
    "companySlug": "cambridge-neurotech",
    "name": "Cambridge NeuroTech tracked neurotechnology program",
    "focus": "Research neural recording tools for neuroscience and BCI-enabling studies",
    "modality": "Silicon neural probes and electrophysiology infrastructure",
    "statusLabel": "Research-only neural probe and recording technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cambridge NeuroTech is retained as a source-backed European neurotechnology program focused on research neural recording tools for neuroscience and bci-enabling studies using silicon neural probes and electrophysiology infrastructure.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cambridge NeuroTech official technology / product information",
        "url": "https://www.cambridgeneurotech.com",
        "publisher": "Cambridge NeuroTech",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-charco-neurotech",
    "companySlug": "charco-neurotech",
    "name": "Charco Neurotech tracked neurotechnology program",
    "focus": "Parkinson's symptom-management neuromodulation and movement support",
    "modality": "Wearable vibrotactile stimulation for Parkinson's symptoms",
    "statusLabel": "CE-marked non-invasive neuromodulation company listed by NeuroFounders",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Charco Neurotech is retained as a source-backed European neurotechnology program focused on parkinson's symptom-management neuromodulation and movement support using wearable vibrotactile stimulation for parkinson's symptoms.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Charco Neurotech official technology / product information",
        "url": "https://charconeurotech.com/",
        "publisher": "Charco Neurotech",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-cogitat",
    "companySlug": "cogitat",
    "name": "Cogitat tracked neurotechnology program",
    "focus": "Hardware-agnostic brain-signal interpretation for BCI applications",
    "modality": "EEG decoding software and BCI data infrastructure",
    "statusLabel": "Early BCI software/data company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Cogitat is retained as a source-backed European neurotechnology program focused on hardware-agnostic brain-signal interpretation for bci applications using eeg decoding software and bci data infrastructure.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Cogitat official technology / product information",
        "url": "https://cogitat.io/",
        "publisher": "Cogitat",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-covvi",
    "companySlug": "covvi",
    "name": "COVVI tracked neurotechnology program",
    "focus": "multi-articulated myoelectric hands.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "COVVI is retained as a source-backed European neurotechnology program focused on multi-articulated myoelectric hands. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "COVVI official website",
        "url": "https://www.covvi.com/",
        "publisher": "COVVI",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-gripable",
    "companySlug": "gripable",
    "name": "GripAble tracked neurotechnology program",
    "focus": "Stroke and neurological upper-limb rehabilitation measurement and therapy",
    "modality": "Sensorized hand-rehabilitation device and software",
    "statusLabel": "Commercial digital rehabilitation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "GripAble is retained as a source-backed European neurotechnology program focused on stroke and neurological upper-limb rehabilitation measurement and therapy using sensorized hand-rehabilitation device and software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "GripAble official technology / product information",
        "url": "https://gripable.co/",
        "publisher": "GripAble",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-mindportal",
    "companySlug": "mindportal",
    "name": "MindPortal tracked neurotechnology program",
    "focus": "brain-computer interface work focused on decoding imagined speech.",
    "modality": "Brain-computer interface (device type not verified)",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "MindPortal is retained as a source-backed European neurotechnology program focused on brain-computer interface work focused on decoding imagined speech. using brain-computer interface (device type not verified).",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "MindPortal official website",
        "url": "https://mindportal.com/",
        "publisher": "MindPortal",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-myndplay",
    "companySlug": "myndplay",
    "name": "MyndPlay tracked neurotechnology program",
    "focus": "Brain-state training, attention research, and non-invasive BCI interaction",
    "modality": "EEG neurofeedback and brain-computer interface software",
    "statusLabel": "Commercial EEG/neurofeedback company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "MyndPlay is retained as a source-backed European neurotechnology program focused on brain-state training, attention research, and non-invasive bci interaction using eeg neurofeedback and brain-computer interface software.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "MyndPlay official technology / product information",
        "url": "https://myndplay.com/",
        "publisher": "MyndPlay",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neubond",
    "companySlug": "neubond",
    "name": "Neubond tracked neurotechnology program",
    "focus": "Stroke technology for patients",
    "modality": "Nerve stimulator",
    "statusLabel": "Investigational; Neuromodulation profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neubond is retained as a source-backed European neurotechnology program focused on stroke technology for patients using nerve stimulator.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neubond official website",
        "url": "https://neubond.co.uk/",
        "publisher": "Neubond",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-neurofenix",
    "companySlug": "neurofenix",
    "name": "Neurofenix tracked neurotechnology program",
    "focus": "Upper-limb recovery and remote neurorehabilitation after stroke",
    "modality": "Home-based stroke rehabilitation device and digital therapy",
    "statusLabel": "Commercial rehabilitation-technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Neurofenix is retained as a source-backed European neurotechnology program focused on upper-limb recovery and remote neurorehabilitation after stroke using home-based stroke rehabilitation device and digital therapy.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Neurofenix official technology / product information",
        "url": "https://www.neurofenix.com/",
        "publisher": "Neurofenix",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nurokor",
    "companySlug": "nurokor",
    "name": "NuroKor tracked neurotechnology program",
    "focus": "At-home neuromodulation and rehabilitation support",
    "modality": "Wearable electrical neurostimulation systems",
    "statusLabel": "Consumer neuromodulation brand marketed by NuroKor Lifetech; the original NuroKor Limited is in liquidation and the Lifetech entity has an active strike-off proposal, so operating status is fragile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "NuroKor is retained as a source-backed European neurotechnology program focused on at-home neuromodulation and rehabilitation support using wearable electrical neurostimulation systems.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "NuroKor official technology / product information",
        "url": "https://nklifetech.co.uk/pages/about-us",
        "publisher": "NuroKor",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-nuropod",
    "companySlug": "nuropod",
    "name": "Nuropod tracked neurotechnology program",
    "focus": "Wellness technology for consumers",
    "modality": "VNS",
    "statusLabel": "Non-medical; Consumer Neurotech profile",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Nuropod is retained as a source-backed European neurotechnology program focused on wellness technology for consumers using vns.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Nuropod official website",
        "url": "https://nuropod.com/",
        "publisher": "Nuropod",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-open-bionics",
    "companySlug": "open-bionics",
    "name": "Open Bionics tracked neurotechnology program",
    "focus": "myoelectric Hero Arm prostheses.",
    "modality": "Assistive control or neurorehabilitation",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Open Bionics is retained as a source-backed European neurotechnology program focused on myoelectric hero arm prostheses. using assistive control or neurorehabilitation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Open Bionics official website",
        "url": "https://openbionics.com/",
        "publisher": "Open Bionics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-oxehealth",
    "companySlug": "oxehealth",
    "name": "Oxehealth tracked neurotechnology program",
    "focus": "Remote health and behavioral observation; adjacent neurohealth measurement technology",
    "modality": "Video-based physiological and behavioral measurement",
    "statusLabel": "Commercial digital health company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Oxehealth is retained as a source-backed European neurotechnology program focused on remote health and behavioral observation; adjacent neurohealth measurement technology using video-based physiological and behavioral measurement.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Oxehealth official technology / product information",
        "url": "https://www.oxehealth.com/",
        "publisher": "Oxehealth",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-renishaw-neuro-solutions",
    "companySlug": "renishaw-neuro-solutions",
    "name": "Renishaw Neuro Solutions tracked neurotechnology program",
    "focus": "Precise neural implant placement and translational neuroscience infrastructure",
    "modality": "Neurosurgical robotics, stereotactic systems, and implantable neural-interface tools",
    "statusLabel": "Established neurotechnology infrastructure supplier",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Renishaw Neuro Solutions is retained as a source-backed European neurotechnology program focused on precise neural implant placement and translational neuroscience infrastructure using neurosurgical robotics, stereotactic systems, and implantable neural-interface tools.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Renishaw Neuro Solutions official technology / product information",
        "url": "https://www.renishaw.com/en/neurosurgery-products-and-systems--6332",
        "publisher": "Renishaw Neuro Solutions",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-scottish-brain-sciences",
    "companySlug": "scottish-brain-sciences",
    "name": "Scottish Brain Sciences tracked neurotechnology program",
    "focus": "EEG and neurofeedback research, Edinburgh.",
    "modality": "EEG or non-invasive neural decoding",
    "statusLabel": "Current official web presence plus a dated discovery record; product maturity requires separate evidence.",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Scottish Brain Sciences is retained as a source-backed European neurotechnology program focused on eeg and neurofeedback research, edinburgh. using eeg or non-invasive neural decoding.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Scottish Brain Sciences official website",
        "url": "https://brainsciences.scot/",
        "publisher": "Scottish Brain Sciences",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-sinaptica-therapeutics",
    "companySlug": "sinaptica-therapeutics",
    "name": "Sinaptica Therapeutics tracked neurotechnology program",
    "focus": "Alzheimer's disease and cognitive-impairment therapy development",
    "modality": "Personalized non-invasive TMS neuromodulation",
    "statusLabel": "Clinical-stage non-invasive neuromodulation company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Sinaptica Therapeutics is retained as a source-backed European neurotechnology program focused on alzheimer's disease and cognitive-impairment therapy development using personalized non-invasive tms neuromodulation.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Sinaptica Therapeutics official technology / product information",
        "url": "https://sinapticatx.com/",
        "publisher": "Sinaptica Therapeutics",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  },
  {
    "id": "europe-project-unlimited-tomorrow",
    "companySlug": "unlimited-tomorrow",
    "name": "Unlimited Tomorrow tracked neurotechnology program",
    "focus": "Accessible upper-limb prosthetic control",
    "modality": "3D-printed EMG-controlled prosthetic arms",
    "statusLabel": "Commercial assistive-technology company",
    "evidenceLevel": "E1",
    "latestUpdateLabel": "Evidence reviewed Aug 2026",
    "sortDate": "2026-08-03",
    "summary": "Unlimited Tomorrow is retained as a source-backed European neurotechnology program focused on accessible upper-limb prosthetic control using 3d-printed emg-controlled prosthetic arms.",
    "demonstrated": "The linked source supports the organization's identity and stated program or product focus.",
    "notYetShown": "No qualifying milestone, sponsor/program/device-matched trial, dated specific video, or direct paper was promoted in this pass. This project record is not evidence of clinical benefit or demonstrated BCI performance.",
    "sourceLinks": [
      {
        "title": "Unlimited Tomorrow official technology / product information",
        "url": "https://www.unlimitedtomorrow.com/",
        "publisher": "Unlimited Tomorrow",
        "sourceType": "company-update",
        "isPrimary": true
      }
    ],
    "isSample": false
  }
];
