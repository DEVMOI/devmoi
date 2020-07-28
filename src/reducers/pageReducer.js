import types from '../actions/types';

const { GET_PAGE_DATA } = types;

const INITIAL_STATE = {
  visibility: true,
  pageData: {},
  thumbNail: '',
  pageDB: [
    {
      page: 'framing-our-work',
      sectionOne: {
        title: 'What is Social Justice?',
        content:
          'Social justice challenges and proposes remedies for how systems of power activate and reinforce different forms of inequality. It is substantive, distributive, and grounded in liberation movements of the past century.<br/> Social justice in our academic context requires both research and action to:',
        images: [
          {
            imgSrc: '/assets/img/framingourwork/OpenHouse-4.png',
            imgAlt: 'Optimize freedom',
            caption: 'Optimize freedom',
          },
          {
            imgSrc: '/assets/img/framingourwork/minimizeorend.png',
            imgAlt: '',
            caption:
              'Minimize or end discrimination through laws, policies, and practices',
          },
          {
            imgSrc: '/assets/img/framingourwork/promoteempathy.png',
            imgAlt: '',
            caption:
              'Promote empathy and community as means of greater inclusion',
          },
          {
            imgSrc: '/assets/img/framingourwork/humandiversity.png',
            imgAlt: '',
            caption: 'Recognize and appreciate human diversity',
          },
          {
            imgSrc: '/assets/img/framingourwork/OpenHouse-3.png',
            imgAlt: '',
            caption:
              'Increase substantive, equitable access to social, economic, and health resources',
          },
          {
            imgSrc: '/assets/img/framingourwork/endinequalities.png',
            imgAlt: '',
            caption:
              'Move toward ending systematic inequalities and enhancing health, social welfare, and equity for all',
          },
        ],
      },
      sectionTwo: {
        title: 'What is Transdisciplinary Research?',
        content:
          "<ol class='list-unstyled'> <li><span class='fnt-goth-bold'>Multidisciplinary</span> research draws on knowledge from different disciplines but each stays within their boundaries.</li> <li><span class='fnt-goth-bold'>Interdisciplinary</span> research analyzes, synthesizes, and harmonizes links between disciplines into a coordinated and coherent whole.</li> <li><span class='fnt-goth-bold'>Transdisciplinary</span> research integrates the natural, social, and health sciences in a humanities context, and transcends their traditional boundaries to create new forms of knowledge and to center community participation.</li> </ol>",
      },
      sectionThree: {
        title: 'What is community-engaged scholarship?',
        content:
          'Community-engaged scholarship as practiced by the Consortium is faculty-led and community-driven. Pursued in full partnership with the community beyond the university’s walls, community-engaged scholarship consists of knowledge discovery, application, dissemination, and preservation.',
      },
    },
    {
      page: 'people',
      sectionOne: {
        title: 'Faculty',
        content:
          "<span class='fnt-goth-bold'>Harnessing the Power of Transdisciplinary Research:</span><br/>Faculty members from multiple disciplines come together to partner with community organizations and groups. These TDR teams identify structural inequalities and other social justice concerns, and submit research proposals which are peer-reviewed. The Consortium’s small grants are used for course releases, student researchers, and capacity-building of community partners.",
        linkTitle: 'Meet our faculty researchers',
        link: '/our-people#faculty-researchers',
        images: [
          {
            imgSrc: '/assets/img/people/people-faculty-img.png',
            imgAlt: 'Optimize freedom',
          },
        ],
      },
      sectionTwo: {
        title: 'Students',
        content:
          "<span class='fnt-goth-bold'>Empowering the Next Generation of Social Justice Researchers to Collaborate with Community:</span><br/> Graduate, professional, and undergraduate students participate in research teams, learning first-hand about social justice research, creating new knowledge through transdisciplinary collaborations, and translating research into action with community partners. Students also participate in professional development opportunities offered by the Consortium.<br/>",
        linkTitle: 'Meet our student researchers',
        link: '/our-people#student-researchers',
        images: [
          {
            imgSrc: '/assets/img/people/people-student-img.png',
            imgAlt: 'Optimize freedom',
          },
        ],
      },
      sectionThree: {
        title: 'Community Involvement',
        content:
          "<span class='fnt-goth-bold'>Translating Research into Community Action:</span><br/>TDR teams collaborate with community partners to develop transformative, novel solutions, and to tackle intransigent structural inequalities. Teams address local to global challenges with outcomes designed to translate research into meaningful social justice action.<br/>",
        linkTitle: 'Meet our community partners',
        link: '/our-people#community-partneres',
        images: [
          {
            imgSrc: '/assets/img/people/people-community-img.png',
            imgAlt: 'Optimize freedom',
          },
        ],
      },
      sectionFour: {
        title: 'Leadership',
        content:
          'The Consortium is directed by Dr. Cate Fosl (Arts & Sciences), and Professor Enid Trucios-Haynes (Law).  A lead partner working group includes Professor Cedric Merlin Powell (Law), Dr. Faye Jones (Medicine), and Dr. Monica Wendel (Public Health). This lead partner working group consults a Consortium Steering Committee, as well as an University Advisory Committee.<br/><br/> From 2017-2020, a Research Manager and Graduate Assistants have managed day-to-day operations with the directors. This includes Research Managers Em Nordling (2018-20), Dr. Keri Mathis (Acting, 2018), and Cassia Herron (2017-18). Several Administrative Graduate Assistants have worked with the Consortium from 2017-20, including: Dr. Keri Mathis (2017-18) (Wake Forest), Dr. Michelle Day, Sara Williams, and Adrienne Smith.',

        images: [
          {
            imgSrc: '/assets/img/people/people-leadership-img.png',
            imgAlt: 'Optimize freedom',
            caption: 'Optimize freedom',
          },
        ],
      },
    },
    {
      page: 'what-we-do',
      sectionOne: {
        title: 'What We Do',
        content: `<span class='fnt-goth-bold'>A Unique Cooperative Funding Model</span> Support from across the University—using a cooperative funding model—is redistributed to transdisciplinary, community-centered research teams. The TDR teams must provide undergraduate and graduate research opportunities.<br/><br/><span class='fnt-goth-bold mt-5'>Innovative Research Support</span> By providing small grants and course releases to TDR teams, the Consortium recognizes the distinct nature of community-engaged research at UofL, which is designated by the Carnegie Foundation as both a Research 1 and a community engaged institution.  Team projects must include social justice policy or practice innovations, and traditional research products.  Research support also includes Undergraduate and Graduate Student Fellowships.<br/><br/><span class='fnt-goth-bold mt-5'>Advancing Research & the Arts/Humanities </span> The Consortium, as a hub for social justice, TDR, and creative activity, generates diverse outputs—from peer-reviewed publications to innovative public scholarship. One goal is to support research in the liberal arts, and research incorporating arts and humanities elements.<br/><br/><span class='fnt-goth-book mt-5'>Professional Development, Education, and Symposia</span> The Consortium hosts professional development and social justice education events for students, community, and faculty researchers. Symposia in 2017, 2018, and 2019 focused on building meaningful community partnerships, participatory action research, translating research into action, and expanding the social impact of research through writing for broader audiences. <br/> — <br/>2017 - Inaugural Social Justice Symposium "(RE) Imagining Social Justice at UofL" with keynote by Dr. Rhonda Y. Williams. <br/>2018 – “Crossing Borders: Translating Research Into Action” with keynote by Dr. Alvaro Huerta.<br/>2019 – “Writing for Social Justice – An Op Ed Workshop with The Progressive Media Project”`,
        images: [
          {
            imgSrc: '/assets/img/whatwedo/whatwedo-img.png',
            imgAlt: 'What we do image',
          },
        ],
      },
      sectionTwo: {
        title: 'Get Involved',
        content:
          "Join the research community:<br/><br/> <span class='fnt-goth-bold'>Connect</span> with social justice researchs at the University of Louisville by searching the database for your interest areas.<br/><span class='fnt-goth-bold'>Subscribe</span> to the Anne Braden Institute Social Justice Research weekly e-news<br/><span class='fnt-goth-bold'>Contact</span> us ar <a class='fnt-goth-bold uofl-red' href='mailto:transdis@louisville.edu'>transdis@louisville.edu</a>",
      },
    },
    {
      page: 'our-purpose',
      sectionOne: {
        title: 'OUR PURPOSE',
        content: `The Cooperative Consortium for Transdisciplinary Social Justice Research is a hub for social justice research at the University of Louisville, connecting faculty, students, and community partners across disciplinary and cultural boundaries. Through small grants, professional development, and community-building, the Consortium supports research at the University leading to innovative solutions to complex social injustices.`,
        images: [
          {
            imgSrc: 'assets/img/about-purpose/about-purpose-students2.jpg',
            imgAlt: 'Student Conference',
          },
        ],
      },
      sectionTwo: {
        title: 'What We Do',
        content: `The Consortium was formed in early 2017 with a competitive internal research innovation grant received through the 21st Century University Initiative for Academic and Research Excellence. Faculty across the University cooperated to launch the Consortium, which was supported with funding from the Office of the Provost and matching pledges from more than 30 University offices, academic units and departments, centers, and institutes.
      <br/><br/>
      The Consortium is directed by Dr. Cate Fosl, Director of the Anne Braden Institute for Social Justice Research and Professor Enid Trucios-Haynes, Director of the Muhammad Ali Institute for Peace and Justice, in collaboration with Professor Cedric Merlin Powell of the Brandeis School of Law’s Laboratory for Citizenship, Dr. Monica Wendel of the Commonwealth Institute of Kentucky, and Dr. Faye Jones of the Health Sciences Center Office of Diversity and Inclusion. This lead partner working group consults a Steering Committee with community partners, as well as a University Advisory Committee.`,
        images: [
          {
            imgSrc: 'assets/img/about-purpose/about-purpose-library-leaves.jpg',
            imgAlt: 'Belknap Library',
          },
        ],
      },
      sectionThree: {
        title: 'LEARN MORE',
        files: [
          { title: 'Consortium At-a-Glance', link: '' },
          {
            title:
              'What is Social Justice Research? Transdisciplinary Research?',
            link: '',
          },
          { title: 'Community Engaged Research?', link: '' },
          { title: 'TDR Teams and Research Projects', link: '' },
          { title: 'Consortium Social Justice Impacts', link: '' },
          { title: 'TDR Teams Publications & Presentations', link: '' },
        ],
      },
    },
    {
      page: 'our-research',
      sectionOne: {
        title: 'OUR RESEARCH PRIORITIES',
        images: [
          {
            src:
              'assets/img/about-purpose/about-purpose-louisville-greetings.png',
            alt: 'Greetings from Louisville Mural',
            caption: 'BUILDING <br/> RESILIENCE: Empowering Communities',
          },
          {
            src: 'assets/img/about-purpose/about-purpose-red-vine.png',
            alt: 'Red Vine Graffiti',
            caption: 'BUILDING <br/> AWARENESS: Advancing Cultural Competency',
          },
          {
            src: 'assets/img/about-purpose/about-purpose-students1.jpg',
            alt: 'Student Discussion',
            caption:
              'IMPROVING YOUTH <br />OUTCOMES: Achievement, Health, &amp; Culture',
          },
          {
            src: 'assets/img/about-purpose/about-purpose-scope-bridge.png',
            alt: 'Louisville Bridge',
            caption:
              'TRANSLATING <br /> RESEARCH INTO ACTION: Policy Development <br /> and Advocacy',
          },
        ],
      },
      sectionTwo: {
        title: 'RESEARCH TEAMS',
        content:
          'A community of transdisciplinary social justice researchers, inside and outisde of the University of Louisville, build research teams to integrate the natural, social, and health sciences in a humanities context. Team members intentionally center community participation and together seek transformative solutions.',
        files: [
          {
            fileName: 'TDR Teams Publications & Presentations',
            fileSrc: '',
            fileType: 'PDF',
          },
        ],
      },
    },
    {
      page: 'research-impact',
      sectionOne: {
        title: 'RESEARCH IMPACT',
        content: `The Consortium supports transformative solutions to structural inequities through researchers with academic and community practice expertise working together. The power of this community-led research can be found in the social, cultural, and research impacts already made by Consortium-supported transdisciplinary research teams from 2017-2020. For instance:<br/><br/><span class="fnt-goth-bold">Creative Writing in Youth Detention Services (now known as the Radical Healing Project):</span><br/> Dr. Aishia Brown and Dr. Tasha Golden led a series of creative writing workshops for girls and gender-expansive youth in Louisville Youth Detention Services (YDS). The TDR team included Dr. Susan Buchino, Dr. Ahmad Washington, and Dr. Mary P. Sheridan. The girls’ work was published by Sarabande Writing Labs and shared with Jefferson County and statewide policy makers and other community stakeholders. This book provides tools for resilience to its authors, and its distribution strives to have their voices influence decision-making within the juvenile justice system. Follow-up research tracks the extent of that influence.<br/><br/>  <span class="fnt-goth-bold">Microagressions in Medicine:</span> A team led by Dr. Lauren Freeman with Dr. David McIntosh and the Kentucky Health Justice Network studied the effects of microaggressions on LGBTQ patients. Using the results, they developed literature for practitioners—including a 2020 book, published by Routledge, Microaggressions and Philosophy, ed. Lauren Freeman et al. Their work also contributed to a new curriculum at the School of Medicine, in order to make offices and hospitals safer spaces and to increase the likelihood of LGBTQ people seeking aid.<br/><br/><span class="fnt-goth-bold">Trauma-Informed Teaching:</span> A project led by Dr. Shelley Thomas with Dr. Shantel Crosby at Westport Middle School trains preservice teachers in trauma-informed classroom management, simultaneously creating a set of best practices for new and current teachers, and encouraging resilience and equal opportunities for the middle school students.<br/><br/><span class="fnt-goth-bold">Equitable Housing:</span> In 2017-19, a research team led by Dr. Lauren Heberle with Dr. Kelly Kinahan and the Metropolitan Housing Coalition published the annual State of Metropolitan Housing Reports. These large-scale research documents focused on The State of Affordable Rental in the Louisville Region (2017), Involuntary Displacement (2018), and 22,000 Equities: Addressing Racial Gaps in Homeownership and Wealth (2019).These reports have been used by key policy makers and community stakeholders, and have been instrumental in the expansion of affordable and fair housing in metro Louisville.`,
        files: [
          { title: 'Consortium Justice Impacts', sec: '', type: 'PDF' },
          {
            title: 'TDR Teams Publications & Presentations',
            sec: '',
            type: 'PDF',
          },
        ],
        images: [],
      },
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PAGE_VISIBILITY':
      return { ...state, visibility: action.payload };
    case 'SET_PAGE_DATA':
      return { ...state, pageData: action.payload };
    case 'SET_PAGE_THUMBNAIL':
      return { ...state, thumbNail: action.payload };
    case GET_PAGE_DATA:
      return { ...state, pageData: action.payload };
    default:
      return state;
  }
};
