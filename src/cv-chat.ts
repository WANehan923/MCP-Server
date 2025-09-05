import { cvData } from './cv-data.js';

export class CVChatService {
  private cvData = cvData;

  public answerQuestion(question: string): string {
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Personal information queries
    if (this.matchesPattern(normalizedQuestion, ['name', 'called', 'who are you'])) {
      return `My name is ${this.cvData.personalInfo.fullName}, but I go by ${this.cvData.personalInfo.preferredName}.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['email', 'contact', 'reach'])) {
      return `You can reach me at ${this.cvData.personalInfo.email} or call me at ${this.cvData.personalInfo.phone.join(' / ')}.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['address', 'location', 'where', 'live'])) {
      return `I live at ${this.cvData.personalInfo.address}.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['github', 'git', 'repository', 'code'])) {
      return `You can find my code repositories on GitHub: ${this.cvData.personalInfo.github}`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['linkedin', 'professional', 'network'])) {
      return `Connect with me on LinkedIn: ${this.cvData.personalInfo.linkedin}`;
    }
    
    // Education queries
    if (this.matchesPattern(normalizedQuestion, ['education', 'study', 'university', 'degree', 'student'])) {
      const currentEducation = this.cvData.education[0];
      return `I'm currently pursuing a ${currentEducation.degree} at ${currentEducation.institution} (${currentEducation.period}). My student ID is ${currentEducation.studentId}.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['graduation', 'graduate', 'when finish', 'complete'])) {
      return `I'm expected to graduate in 2025 with my BSc (Hons) in Computer Science from Plymouth University.`;
    }
    
    // Skills queries
    if (this.matchesPattern(normalizedQuestion, ['skills', 'technology', 'programming', 'languages', 'tech stack'])) {
      return `My technical skills include:\n- Programming: ${this.cvData.skills.programming.join(', ')}\n- Databases: ${this.cvData.skills.databases.join(', ')}\n- Cloud: ${this.cvData.skills.cloud.join(', ')}\n- Design: ${this.cvData.skills.design.join(', ')}\n- Other: ${this.cvData.skills.technologies.join(', ')}`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['react', 'frontend', 'web development'])) {
      const frontendSkills = this.cvData.skills.programming.filter(skill => 
        ['React', 'HTML', 'CSS', 'JavaScript'].includes(skill)
      );
      return `Yes, I'm skilled in frontend development with: ${frontendSkills.join(', ')}. I've used these in several projects including my AI Chatbot and E-Commerce applications.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['backend', 'server', 'node'])) {
      return `For backend development, I work with Node.js, PHP, and have experience with databases like MySQL, MongoDB, and Firebase.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['aws', 'cloud', 'deployment'])) {
      return `I have experience with cloud technologies including AWS and Google Cloud Platform, which I've used in my university projects.`;
    }
    
    // Experience queries
    if (this.matchesPattern(normalizedQuestion, ['experience', 'work', 'job', 'employment', 'worked'])) {
      const experiences = this.cvData.experiences.map(exp => 
        `${exp.duration} as ${exp.position} at ${exp.company || exp.field}`
      ).join('\n- ');
      return `My work experience includes:\n- ${experiences}`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['last position', 'recent job', 'latest work', 'current job'])) {
      const lastJob = this.cvData.experiences[0];
      return `My most recent position was ${lastJob.position} in the ${lastJob.department} at ${lastJob.company}, where I worked for ${lastJob.duration}.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['bank', 'ndb', 'banking', 'finance'])) {
      const bankExp = this.cvData.experiences.find(exp => exp.company === 'NDB Bank');
      return `I worked as a ${bankExp?.position} in the ${bankExp?.department} at ${bankExp?.company} for ${bankExp?.duration}.`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['freelance', 'graphic', 'design'])) {
      const freelanceExp = this.cvData.experiences.find(exp => exp.type === 'Freelance');
      return `I have ${freelanceExp?.duration} of experience as a ${freelanceExp?.position} in ${freelanceExp?.field}.`;
    }
    
    // Projects queries
    if (this.matchesPattern(normalizedQuestion, ['projects', 'built', 'created', 'developed'])) {
      const projectList = this.cvData.projects.map(project => 
        `${project.name} (${project.year}) - ${project.description}`
      ).join('\n- ');
      return `Here are my key projects:\n- ${projectList}`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['latest project', 'recent project', 'newest'])) {
      const latestProjects = this.cvData.projects.filter(p => p.year === '2025');
      const projectList = latestProjects.map(p => `${p.name} - ${p.description}`).join('\n- ');
      return `My latest projects from 2025:\n- ${projectList}`;
    }
    
    if (this.matchesPattern(normalizedQuestion, ['ai', 'chatbot', 'machine learning', 'ml'])) {
      const aiProjects = this.cvData.projects.filter(p => 
        p.name.toLowerCase().includes('ai') || 
        p.name.toLowerCase().includes('authentication') ||
        p.technologies.some(tech => tech.toLowerCase().includes('ai') || tech.toLowerCase().includes('ml'))
      );
      if (aiProjects.length > 0) {
        const projectDetails = aiProjects.map(p => `${p.name} - ${p.description}`).join('\n- ');
        return `My AI/ML projects include:\n- ${projectDetails}`;
      }
    }
    
    if (this.matchesPattern(normalizedQuestion, ['ecommerce', 'e-commerce', 'shopping', 'handcraft'])) {
      const ecomProject = this.cvData.projects.find(p => p.name.toLowerCase().includes('commerce'));
      return `I developed a ${ecomProject?.name} in ${ecomProject?.year} - ${ecomProject?.description} using ${ecomProject?.technologies.join(', ')}.`;
    }
    
    // Expertise and soft skills
    if (this.matchesPattern(normalizedQuestion, ['strengths', 'expertise', 'soft skills', 'qualities'])) {
      return `My key strengths include: ${this.cvData.expertise.join(', ')}.`;
    }
    
    // References
    if (this.matchesPattern(normalizedQuestion, ['references', 'recommendations', 'contacts'])) {
      const refs = this.cvData.references.map(ref => 
        `${ref.name} - ${ref.position}${ref.company ? ` at ${ref.company}` : ''}`
      ).join('\n- ');
      return `My references include:\n- ${refs}`;
    }
    
    // Profile/About
    if (this.matchesPattern(normalizedQuestion, ['about', 'profile', 'summary', 'who', 'describe yourself'])) {
      return this.cvData.profile;
    }
    
    // Age/Birthday
    if (this.matchesPattern(normalizedQuestion, ['age', 'old', 'birth', 'birthday'])) {
      return `I was born on ${this.cvData.personalInfo.dateOfBirth} (September 23, 2001).`;
    }
    
    // Default response for unmatched questions
    return `I'm not sure about that specific question. You can ask me about my education, work experience, projects, skills, contact information, or personal background. What would you like to know?`;
  }
  
  private matchesPattern(question: string, patterns: string[]): boolean {
    return patterns.some(pattern => question.includes(pattern));
  }
  
  public getAvailableTopics(): string[] {
    return [
      'Personal Information (name, contact, location)',
      'Education (degree, university, graduation)',
      'Work Experience (jobs, positions, companies)',
      'Technical Skills (programming languages, tools)',
      'Projects (recent work, GitHub repositories)',
      'Expertise & Soft Skills',
      'References & Contacts'
    ];
  }
}