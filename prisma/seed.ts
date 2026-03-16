import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean up existing data
  await prisma.section.deleteMany();
  await prisma.page.deleteMany();

  // Create the home page
  const homePage = await prisma.page.create({
    data: {
      slug: 'home',
      title: 'ColabQtrix Technologies — Home',
      isPublished: true,
    },
  });

  console.log(`✅ Created page: ${homePage.slug}`);

  // Seed all 9 sections
  const sections = [
    {
      pageId: homePage.id,
      type: 'navbar',
      order: 1,
      content: {
        componentId: 'navbar_001',
        logo: {
          text: 'ColabQtrix Technologies',
          icon: '/logo.svg',
        },
        links: [
          { label: 'Home', href: '#home' },
          { label: 'Careers', href: '/Careers.html' },
          { label: 'Contact', href: '#contact' },
        ],
        contactInfo: {
          email: 'contact@colabqtrix.com',
          phone: '(+91) - 87998 73735',
        },
      },
    },
    {
      pageId: homePage.id,
      type: 'hero',
      order: 2,
      content: {
        componentId: 'hero_001',
        title: 'Data, Design, Disruption, Delivered',
        subtitle: 'Collaborating towards tomorrow\'s tech breakthroughs.',
        primaryButton: {
          label: 'Join Us',
          href: '#contact',
        },
        secondaryButton: {
          label: 'Contact Us',
          href: '#contact',
        },
        image: 'https://colabqtrix.com/images/hero-graphic.png',
      },
    },
    {
      pageId: homePage.id,
      type: 'services',
      order: 3,
      content: {
        componentId: 'services_001',
        heading: 'Comprehensive Technology Services',
        description: 'At ColabQtrix, we integrate Research & Development at the heart of our process. Our consultancy services extend beyond development, offering businesses strategic guidance on leveraging the latest in AI, cloud, automation, and data technologies.',
        services: [
          {
            id: 'svc1',
            title: 'End-to-End Software Solutions',
            description: 'Custom web and mobile application development tailored to your business needs.',
            icon: 'BiUserCheck',
            image: '/images/endServices.png'
          },
          {
            id: 'svc2',
            title: 'Business & Digital Strategy Consulting',
            description: 'Market research, tech-stack audits, and strategic roadmaps.',
            icon: 'BiGraphUp',
            image: '/images/digitalStrategy.png'
          },
          {
            id: 'svc3',
            title: 'Post-Deployment Support & AMC',
            description: 'Continuous monitoring and maintenance contracts.',
            icon: 'BiHeadset',
            image: '/images/postDeploy.png'
          },
          {
            id: 'svc4',
            title: 'R&D and Technology Consultancy',
            description: 'Feasibility studies and technology innovation guidance.',
            icon: 'BiShieldLock',
            image: '/images/r&d.png'
          }
        ]
      }
    },
    {
      pageId: homePage.id,
      type: 'about',
      order: 4,
      content: {
        componentId: 'about_001',
        sectionLabel: 'ABOUT US',
        heading: 'We provide prompt, personal, and reliable support to every client.',
        description: 'ColabQtrix Technologies is a forward-thinking technology firm committed to delivering cutting-edge software solutions, cloud-based platforms, and comprehensive IT and business consultancy services. Established with a vision to bridge the gap between innovation and practical implementation, we specialize in creating intelligent digital systems that are scalable, secure, and user-focused. Our team brings together expertise across software development, web and mobile application design, UI/UX engineering, cloud infrastructure, and IT tool integration. Whether it\'s building custom applications or optimizing existing systems, we ensure that every solution is tailored to our client’s unique operational needs and long-term goals.\n\nAt ColabQtrix, we believe that technology should not only serve a function but also enhance business value. That’s why we integrate Research & Development (R&D) at the heart of our process. Our consultancy services extend beyond development, offering businesses strategic guidance on leveraging the latest in AI, cloud, automation, and data technologies to stay ahead in a competitive landscape. We are also proud to offer Annual Maintenance Contracts (AMCs) and post-deployment technical support, ensuring sustained performance and proactive issue resolution.\n\nWe aim to empower businesses to scale, transform, and lead in the digital era through high-impact solutions and expert consultancy.',
        visionHeading: 'Vision Statement',
        vision: 'To be a global catalyst for digital innovation by delivering intelligent, reliable, and future-ready technology solutions that empower businesses and accelerate transformation.',
        missionHeading: 'Mission Statement',
        mission: [
          'To deliver user-centric designs, intuitive platforms, and high-performance applications that drive operational excellence.',
          'To provide expert IT and research consultancy that fosters innovation and supports sustainable digital growth.',
          'To continuously explore emerging technologies and transform them into practical, scalable business solutions.',
          'To collaborate with clients as long-term partners, delivering value through transparency, quality, and technological foresight.'
        ],
        keyValuesHeading: 'Key Values and Vision',
        keyValues: [
          'Innovation',
          'Security',
          'User-Centric Design',
          'Transparency',
          'Empowerment'
        ],
        image: {
          src: '/images/about_2-min.png',
          alt: 'Technology'
        }
      },
    },
    {
      pageId: homePage.id,
      type: 'founder',
      order: 5,
      content: {
        componentId: 'founder_001',
        badge: 'FROM THE FOUNDER',
        heading: 'Message',
        founderName: 'Founder & CEO',
        founderTitle: 'ColabQtrix Technologies LLP',
        founderImage: {
          src: '/images/founder.jpg',
          alt: 'Founder'
        },
        quote: [
          'It gives me immense pride to introduce ColabQtrix Technologies LLP, a vision born out of the passion for solving real-world problems through intelligent technology. With a deep belief in innovation, collaboration, and purposeful execution, ColabQtrix was founded to bridge the gap between business needs and scalable digital solutions.',
          'Our mission is to empower startups, SMEs, and enterprises with software that\'s not just functional — but transformative. From application development and user-centric design to post-deployment support and research-driven consultancy, we strive to deliver excellence at every touchpoint. We are not just a service provider — we\'re your technology partner.',
          'As we grow, our core values remain unchanged: innovation with intent, service with integrity, and growth through collaboration. I thank everyone who has supported this journey, and I look forward to building a future where ideas are engineered into impact.'
        ]
      },
    },
    {
      pageId: homePage.id,
      type: 'how_it_works',
      order: 6,
      content: {
        componentId: 'solutions_001',
        badge: 'HOW IT WORKS',
        heading: 'How It Works',
        steps: [
          {
            id: 'step_1',
            stepNumber: 1,
            title: 'Connect with Us',
            description: 'Reach out via our website or contact form. Our team will assess your requirements and schedule a free consultation to understand your business goals.'
          },
          {
            id: 'step_2',
            stepNumber: 2,
            title: 'Tailor the Solution',
            description: 'Based on your needs, we design a solution roadmap. Whether it\'s a web app, cloud platform, or IT consultancy, we align it with your objectives using agile methodology.'
          },
          {
            id: 'step_3',
            stepNumber: 3,
            title: 'Build & Integrate',
            description: 'Our expert developers, designers, and analysts build and deploy the solution ensuring high performance, secure architecture, and seamless integration with your ecosystem.'
          },
          {
            id: 'step_4',
            stepNumber: 4,
            title: 'Support & Grow',
            description: 'We don\'t stop at delivery. Our post-deployment support, AMC services, and R&D consultancy help you evolve, optimize, and innovate continuously.'
          }
        ],
        bottomImage: {
          src: '/images/End_howitworks.png',
          alt: 'End How It Works'
        }
      },
    },
    {
      pageId: homePage.id,
      type: 'testimonials',
      order: 7,
      content: {
        componentId: 'testimonials_001',
        sectionLabel: 'TESTIMONIALS',
        heading: 'What Our Users Are Saying',
        subheading: 'Real Stories of Success and Satisfaction from Our Diverse Community',
        items: [
          {
            id: 'testimonial_1',
            quote: 'ColabQtrix provided us with expert technology consultancy that was both strategic and actionable. Their insights helped us make confident, future-ready decisions aligned with our business goals.',
            author: 'Researcher'
          },
          {
            id: 'testimonial_2',
            quote: 'The technical support team at ColabQtrix is incredibly responsive and solution-oriented. Every query was resolved swiftly with clear communication and professionalism.',
            author: 'Academician'
          },
          {
            id: 'testimonial_3',
            quote: 'Their AMC services have ensured our systems run smoothly with zero downtime. Regular updates, monitoring, and preventive maintenance have added great value to our operations.',
            author: 'Education Institute'
          }
        ],
      },
    },
    {
      pageId: homePage.id,
      type: 'contact',
      order: 8,
      content: {
        componentId: 'contact_001',
        sectionLabel: 'CONTACT',
        heading: 'Contact Us',
        subheading: 'Utilize our tools to develop your concepts and bring your vision to life. Once complete, effortlessly share your creations.',
        phones: [
          '(+91) - 87998 73735',
          '(+91) - 7588 495977'
        ],
        emails: [
          'contact@colabqtrix.com',
          'colabqtrix@gmail.com'
        ],
        address: 'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Ganga%20Fernhill%20Society%20Undri%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed'
      },
    },
    {
      pageId: homePage.id,
      type: 'footer',
      order: 9,
      content: {
        componentId: 'footer_001',
        aboutHeading: 'About',
        aboutText: 'ColabQtrix Technologies LLP is a technology-driven company specializing in custom software development, cloud platforms, web and mobile applications, UI/UX design, and IT consultancy. We empower businesses with scalable, secure, and user-centric digital solutions, backed by research and innovation.',
        companyHeading: 'Company',
        companyLinks: [
          { label: 'About Us', href: '#about' },
          { label: 'Careers', href: '/careers', badge: "we're hiring" },
          { label: 'Terms & Conditions', href: '/terms' },
          { label: 'Privacy Policy', href: '/privacy' }
        ],
        contactHeading: 'Contact',
        address: 'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
        emails: ['contact@colabqtrix.com'],
        phones: ['(+91) - 87998 73735', '(+91) - 7588 495977'],
        website: 'www.colabqtrix.com',
        websiteUrl: 'https://colabqtrix.com',
        copyright: '© 2026 ColabQtrix Technologies. All rights reserved.',
        visitorCount: ['0', '0', '0', '6', '5', '1']
      },
    },
  ];

  // Create the privacy page
  const privacyPage = await prisma.page.create({
    data: {
      slug: 'privacy',
      title: 'Privacy Policy − ColabQtrix Technologies',
      isPublished: true,
    },
  });

  console.log(`✅ Created page: ${privacyPage.slug}`);

  // Seed Privacy sections
  const privacySections = [
  {
    pageId: privacyPage.id,
    type: 'navbar',
    order: 1,
    content: {
      componentId: 'navbar_002',
      logo: {
        text: 'ColabQtrix Technologies',
        icon: '/logo.svg',
      },
      links: [
        { label: 'Home', href: '/' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/#contact' },
      ],
      contactInfo: {
        email: 'contact@colabqtrix.com',
        phone: '(+91) - 87998 73735',
      },
    },
  },
  {
    pageId: privacyPage.id,
    type: 'privacy',
    order: 2,
    content: {
      componentId: 'privacy_001',
      heading: 'Privacy Policy',
      effectiveDate: 'Effective from: 25.07.2025',
      paragraphs: [
        'The information and explanations provided on this page are intended solely as general and high-level guidance on how to draft a Privacy Policy or related legal documentation. This content is not, and should not be considered, legal advice or a substitute for professional legal counsel. Every business has unique legal obligations and privacy practices based on its services, geographic location, and user interactions.',
        
        'Therefore, ColabQtrix Technologies LLP makes no warranties or guarantees regarding the completeness, accuracy, or legal enforceability of any example language or interpretations shared on this page. You should not rely solely on this information when preparing your own Privacy Policy or Terms & Conditions.',
        
        'We strongly recommend that you consult a qualified legal professional to help you fully understand the legal implications of your privacy obligations and to assist in creating policies tailored specifically to your business needs and compliance requirements.',
        
        'At ColabQtrix Technologies, we value your trust and are committed to safeguarding your privacy.',
        
        'This Privacy Policy outlines how we collect, use, disclose, and manage the data of our website visitors and customers.',
        
        'We may collect personal information such as your name, email address, contact details, company information, and other data voluntarily provided by you through forms, emails, or inquiries.',
        
        'Additionally, we may collect non-personal data, including IP addresses, browser details, and usage patterns, through cookies and analytics tools to enhance user experience and improve our services.',
        
        'We use the information collected to communicate with you, provide services, respond to inquiries, customize user experiences, and ensure the security and performance of our website.',
        
        'We do not sell or rent your personal data. However, we may share information with trusted third-party partners for operational purposes, ensuring they adhere to strict confidentiality and security standards. Your data is protected using encryption, secure servers, and other industry-standard practices to prevent unauthorized access or misuse.',
        
        'Our website uses cookies and similar tracking technologies to analyze traffic and improve site functionality. You can adjust your browser settings to manage or disable cookies as per your preference.',
        
        'Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information, withdraw consent, or request data portability.',
        
        'To exercise these rights, please contact us at contact@colabqtrix.com.'
      ],
      contactEmail: 'contact@colabqtrix.com'
    }
  },
  {
    pageId: privacyPage.id,
    type: 'contact',
    order: 3,
    content: {
      componentId: 'contact_002',
      sectionLabel: 'CONTACT',
      heading: 'Contact Us',
      subheading:
        'Utilize our tools to develop your concepts and bring your vision to life. Once complete, effortlessly share your creations.',
      phones: ['(+91) - 87998 73735', '(+91) - 7588 495977'],
      emails: ['contact@colabqtrix.com', 'colabqtrix@gmail.com'],
      address:
        'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
      mapEmbedUrl:
        'https://maps.google.com/maps?q=Ganga%20Fernhill%20Society%20Undri%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
  },
  {
    pageId: privacyPage.id,
    type: 'footer',
    order: 4,
    content: {
      componentId: 'footer_002',
      aboutHeading: 'About',
      aboutText:
        'ColabQtrix Technologies LLP is a technology-driven company specializing in custom software development, cloud platforms, web and mobile applications, UI/UX design, and IT consultancy. We empower businesses with scalable, secure, and user-centric digital solutions, backed by research and innovation.',
      companyHeading: 'Company',
      companyLinks: [
        { label: 'About Us', href: '/#about' },
        { label: 'Careers', href: '/careers', badge: "we're hiring" },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' }
      ],
      contactHeading: 'Contact',
      address:
        'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
      emails: ['contact@colabqtrix.com'],
      phones: ['(+91) - 87998 73735', '(+91) - 7588 495977'],
      website: 'www.colabqtrix.com',
      websiteUrl: 'https://colabqtrix.com',
      copyright:
        '© 2026 ColabQtrix Technologies. All rights reserved.',
      visitorCount: ['0', '0', '0', '6', '5', '1']
    },
  },
];

  for (const section of sections) {
    await prisma.section.create({ data: section });
    console.log(`✅ Seeded section: ${section.type} (order: ${section.order})`);
  }
  for (const section of privacySections) {
    await prisma.section.create({ data: section });
    console.log(`✅ Seeded privacy section: ${section.type} (order: ${section.order})`);
  }

  // Create the terms page
  const termsPage = await prisma.page.create({
    data: {
      slug: 'terms',
      title: 'Terms & Conditions − ColabQtrix Technologies',
      isPublished: true,
    },
  });

  console.log(`✅ Created page: ${termsPage.slug}`);

  // Seed Terms sections
  const termsSections = [
    {
      pageId: termsPage.id,
      type: 'navbar',
      order: 1,
      content: {
        componentId: 'navbar_003',
        logo: {
          text: 'ColabQtrix Technologies',
          icon: '/logo.svg',
        },
        links: [
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact', href: '/#contact' },
        ],
        contactInfo: {
          email: 'contact@colabqtrix.com',
          phone: '(+91) - 87998 73735',
        },
      },
    },
    {
      pageId: termsPage.id,
      type: 'terms',
      order: 2,
      content: {
        componentId: 'terms_001',
        heading: 'Terms & Conditions',
        paragraphs: [
          'The information, content, materials, graphics, and services provided on this website ("www.colabqtrix.com") are for general informational purposes only and are the intellectual property of ColabQtrix Technologies. While we strive to keep the content accurate and up to date, ColabQtrix makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Site or the information, products, services, or related graphics contained on the Site for any purpose.',
          'Any reliance you place on such information is therefore strictly at your own risk. Under no circumstances shall ColabQtrix Technologies or its representatives be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of access to or use of this Site, including but not limited to loss of data, revenue, or profits.',
          'This website may contain links to external third-party websites. These links are provided solely for your convenience and do not constitute endorsement or control over the content or availability of those sites. We are not responsible for the protection and privacy of any information you provide while visiting such websites.',
          'All trademarks, logos, and brand names displayed on this website are the property of their respective owners. Unauthorized use, copying, or distribution of any material from this Site is prohibited without prior written consent from ColabQtrix Technologies.',
          'We reserve the right to modify, update, or remove any part of this disclaimer at any time without prior notice. Your continued use of the Site constitutes acceptance of these terms.',
        ],
        sections: [
          {
            title: '1. Use of Website & Services',
            text: 'All content, tools, and features provided on our site are intended for lawful, informational, and commercial purposes only. You agree not to misuse, replicate, or redistribute any material, code, or design from this website without written permission.',
          },
          {
            title: '2. Intellectual Property',
            text: 'All content, logos, trademarks, software, and designs are the exclusive property of ColabQtrix Technologies or its licensors. Unauthorized use or reproduction is strictly prohibited.',
          },
          {
            title: '3. Privacy & Data Handling',
            text: 'We are committed to protecting your privacy. Any data collected through forms, cookies, or analytics is handled in accordance with our Privacy Policy.',
          },
          {
            title: '4. Service Availability & Modifications',
            text: 'We reserve the right to modify, suspend, or discontinue any part of our website or services at any time, without prior notice. We are not liable for any temporary unavailability due to technical issues or maintenance.',
          },
          {
            title: '5. Limitation of Liability',
            text: 'ColabQtrix Technologies shall not be held responsible for any loss, damage, or interruption of business arising from the use or inability to use our site, software, or services.',
          },
          {
            title: '6. Third-Party Links',
            text: 'Our website may contain links to third-party websites or tools. We do not endorse or control these external sites and are not responsible for their content or policies.',
          },
          {
            title: '7. Changes to Terms',
            text: 'We may revise these terms at any time. Continued use of the website or services after such changes constitutes acceptance of the updated terms.',
          },
          {
            title: '8. Governing Law',
            text: 'These Terms & Conditions are governed by and construed in accordance with the laws of India, and any disputes shall be subject to the jurisdiction of courts located in Pune, Maharashtra.',
          },
        ],
      },
    },
    {
      pageId: termsPage.id,
      type: 'contact',
      order: 3,
      content: {
        componentId: 'contact_003',
        sectionLabel: 'CONTACT',
        heading: 'Contact Us',
        subheading: 'Utilize our tools to develop your concepts and bring your vision to life. Once complete, effortlessly share your creations.',
        phones: ['(+91) - 87998 73735', '(+91) - 7588 495977'],
        emails: ['contact@colabqtrix.com', 'colabqtrix@gmail.com'],
        address: 'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Ganga%20Fernhill%20Society%20Undri%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed',
      },
    },
    {
      pageId: termsPage.id,
      type: 'footer',
      order: 4,
      content: {
        componentId: 'footer_003',
        aboutHeading: 'About',
        aboutText: 'ColabQtrix Technologies LLP is a technology-driven company specializing in custom software development, cloud platforms, web and mobile applications, UI/UX design, and IT consultancy. We empower businesses with scalable, secure, and user-centric digital solutions, backed by research and innovation.',
        companyHeading: 'Company',
        companyLinks: [
          { label: 'About Us', href: '/#about' },
          { label: 'Careers', href: '/careers', badge: "we're hiring" },
          { label: 'Terms & Conditions', href: '/terms' },
          { label: 'Privacy Policy', href: '/privacy' }
        ],
        contactHeading: 'Contact',
        address: 'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
        emails: ['contact@colabqtrix.com'],
        phones: ['(+91) - 87998 73735', '(+91) - 7588 495977'],
        website: 'www.colabqtrix.com',
        websiteUrl: 'https://colabqtrix.com',
        copyright: '© 2026 ColabQtrix Technologies. All rights reserved.',
        visitorCount: ['0', '0', '0', '6', '5', '1']
      },
    },
  ];

  for (const section of termsSections) {
    await prisma.section.create({ data: section });
    console.log(`✅ Seeded terms section: ${section.type} (order: ${section.order})`);
  }

  // Create the careers page
  const careersPage = await prisma.page.create({
    data: {
      slug: 'careers',
      title: 'Careers − ColabQtrix Technologies',
      isPublished: true,
    },
  });

  console.log(`✅ Created page: ${careersPage.slug}`);

  // Seed Careers sections
  const careersSections = [
    {
      pageId: careersPage.id,
      type: 'navbar',
      order: 1,
      content: {
        componentId: 'navbar_004',
        logo: {
          text: 'ColabQtrix Technologies',
          icon: '/logo.svg',
        },
        links: [
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact', href: '/#contact' },
        ],
        contactInfo: {
          email: 'contact@colabqtrix.com',
          phone: '(+91) - 87998 73735',
        },
      },
    },
    {
      pageId: careersPage.id,
      type: 'careers',
      order: 2,
      content: {
        componentId: 'careers_001',
        heading: 'Careers at ColabQtrix',
        jobs: [
          {
            title: 'Innovation & Research Intern',
            position: 'Internship (Full-Time/Part-Time)',
            location: 'Remote / Pune (Hybrid Option Available)',
            duration: '3 to 6 months',
            stipend: 'Performance-Based / Certificate + LOR',
            openings: '02',
            about:
              'As an Innovation & Research Intern at ColabQtrix, you will support new product ideas, research technical trends, and contribute to consultancy projects. You’ll help bridge business needs with technical strategy using creative thinking and analytical skills.',
            responsibilities:
              'Conduct technical research on trends like AI, cloud, APIs, and digital transformation. Assist in preparing reports, R&D documentation, and solution blueprints. Support UI/UX design mockups using tools like Figma or Canva. Participate in consultancy and client workshops. Analyze business requirements and assist in prototype planning.',
            requirements: [
              'Students or graduates in IT, Computer Science, or Business Technology domains',
              'Exposure to research or design tools (Figma, Miro, Notion, Excel)',
              'Strong analytical and documentation skills',
              'Curious mindset with passion for technology innovation',
              'Excellent verbal and written communication',
            ],
          },
          {
            title: 'Web Developer Intern',
            position: 'Internship (Full-Time/Part-Time)',
            location: 'Remote / Pune (Hybrid Option Available)',
            duration: '3 to 6 months',
            stipend: 'Performance-Based / Certificate + LOR',
            openings: '01',
            about:
              'Develop responsive websites and web applications using HTML5, CSS3, JavaScript, and modern frameworks like React, Vue, or Angular. Integrate RESTful APIs and optimize website performance.',
            responsibilities:
              'Assist in building frontend and backend components using HTML, CSS, JavaScript, and frameworks. Write clean testable code and collaborate via Git. Integrate APIs and cloud services like Firebase, AWS, or GCP. Debug, test, and document software components.',
            requirements: [
              'Proficiency in HTML5, CSS3, JavaScript',
              'Experience with React, Angular, or Vue',
              'Understanding of responsive and mobile-first design',
              'Knowledge of SEO and performance best practices',
              'Good communication and problem-solving skills',
            ],
            preferred: [
              'Knowledge of backend technologies like Node.js or Python',
              'Experience with CMS platforms',
              'Experience with cloud deployment tools',
            ],
          },
        ],
        resumeSection: {
          image: {
            src: '/images/End_howitworks.png',
            alt: 'Career Application',
          },
          instructions: [
            'Send your resume with subject line',
            'Send Mail to contact@colabqtrix.com',
            'Mark CC to colabqtrix@gmail.com',
          ],
        },
      },
    },
    {
      pageId: careersPage.id,
      type: 'contact',
      order: 3,
      content: {
        componentId: 'contact_004',
        sectionLabel: 'CONTACT',
        heading: 'Contact Us',
        subheading: 'Utilize our tools to develop your concepts and bring your vision to life. Once complete, effortlessly share your creations.',
        phones: ['(+91) - 87998 73735', '(+91) - 7588 495977'],
        emails: ['contact@colabqtrix.com', 'colabqtrix@gmail.com'],
        address: 'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
        mapEmbedUrl: 'https://maps.google.com/maps?q=Ganga%20Fernhill%20Society%20Undri%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed',
      },
    },
    {
      pageId: careersPage.id,
      type: 'footer',
      order: 4,
      content: {
        componentId: 'footer_004',
        aboutHeading: 'About',
        aboutText: 'ColabQtrix Technologies LLP is a technology-driven company specializing in custom software development, cloud platforms, web and mobile applications, UI/UX design, and IT consultancy. We empower businesses with scalable, secure, and user-centric digital solutions, backed by research and innovation.',
        companyHeading: 'Company',
        companyLinks: [
          { label: 'About Us', href: '/#about' },
          { label: 'Careers', href: '/careers', badge: "we're hiring" },
          { label: 'Terms & Conditions', href: '/terms' },
          { label: 'Privacy Policy', href: '/privacy' }
        ],
        contactHeading: 'Contact',
        address: 'A-705 Ganga Fernhill Society, Punekar Nagar, Undri, Pune, (M.H.), India- 411060',
        emails: ['contact@colabqtrix.com'],
        phones: ['(+91) - 87998 73735', '(+91) - 7588 495977'],
        website: 'www.colabqtrix.com',
        websiteUrl: 'https://colabqtrix.com',
        copyright: '© 2026 ColabQtrix Technologies. All rights reserved.',
        visitorCount: ['0', '0', '0', '6', '5', '1']
      },
    },
  ];

  for (const section of careersSections) {
    await prisma.section.create({ data: section });
    console.log(`✅ Seeded careers section: ${section.type} (order: ${section.order})`);
  }

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
