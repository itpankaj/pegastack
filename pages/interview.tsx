import Head from 'next/head';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Card from '../components/UI/Card';

export default function Interview() {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const interviewQuestions = {
    beginner: [
      {
        id: 1,
        question: "What is PEGA BPM and how does it differ from traditional workflow management?",
        answer: `PEGA BPM (Business Process Management) is a comprehensive platform that combines case management with traditional workflow management. Key differences include:

**PEGA BPM Features:**
- Case-centric approach for complex, knowledge-intensive processes
- Declarative rules engine for business logic
- Built-in integration capabilities
- Real-time analytics and reporting
- Low-code development environment

**Traditional Workflow:**
- Sequential, predefined process flows
- Requires extensive coding for business rules
- Limited integration options
- Basic reporting capabilities

PEGA's case management approach allows for more flexible, adaptive processes that can handle exceptions and variations more effectively than traditional workflow systems.`,
        tags: ['BPM', 'Case Management', 'Workflow']
      },
      {
        id: 2,
        question: "Explain the concept of Case Types in PEGA.",
        answer: `A Case Type in PEGA represents a specific business transaction or process that needs to be managed from start to finish.

**Key Characteristics:**
- Defines the overall structure and lifecycle of a business process
- Contains stages that group related work together
- Includes processes that define the specific steps and actions
- Can have sub-cases for complex scenarios

**Example:** 
A "Loan Application" case type might include:
- **Stages:** Application, Review, Approval, Disbursement
- **Processes:** Document collection, Credit check, Risk assessment
- **Sub-cases:** Property valuation, Insurance verification

**Benefits:**
- Provides clear visibility into process status
- Enables tracking and reporting
- Supports process optimization
- Facilitates compliance and auditing`,
        tags: ['Case Types', 'Process Design', 'Stages']
      },
      {
        id: 3,
        question: "What is the difference between App Studio and Dev Studio in PEGA?",
        answer: `App Studio and Dev Studio are both development environments in PEGA, designed for different types of users and development approaches.

**App Studio:**
- **Target Users:** Business users, citizen developers
- **Approach:** Low-code/no-code development
- **Focus:** Case lifecycle, business processes, UI design
- **Features:** Drag-and-drop interface, guided development, templates
- **Use Cases:** Rapid prototyping, simple applications, business-driven development

**Dev Studio:**
- **Target Users:** Technical developers, system architects
- **Approach:** Traditional development with full access to PEGA platform
- **Focus:** Complex rules, integrations, advanced configurations
- **Features:** Complete rule access, debugging tools, performance optimization
- **Use Cases:** Complex applications, system integrations, advanced customizations

**When to Use Which:**
- Use App Studio for quick business applications and prototypes
- Use Dev Studio for complex enterprise applications and system integrations
- Both can be used together in a collaborative development approach`,
        tags: ['App Studio', 'Dev Studio', 'Development Environment']
      }
    ],
    intermediate: [
      {
        id: 4,
        question: "Explain Rule Resolution in PEGA and its importance.",
        answer: `Rule Resolution is PEGA's mechanism for determining which version of a rule to execute when multiple versions exist.

**Rule Resolution Algorithm:**
1. **Availability:** Check if rule is available in current date/time range
2. **Circumstance:** Match circumstance conditions if applicable  
3. **Class Hierarchy:** Search up the class inheritance tree
4. **Ruleset List:** Check rulesets in the order defined in the application
5. **Version:** Select the highest version number

**Key Factors:**
- **Class:** More specific classes take precedence
- **Ruleset:** Order in application ruleset list matters
- **Version:** Higher version numbers override lower ones
- **Circumstance:** Allows rule specialization based on conditions

**Best Practices:**
- Use meaningful class hierarchies
- Properly order rulesets in applications
- Use circumstances sparingly and document them well
- Avoid creating too many rule versions

**Example:**
If you have rules in classes Work-MyApp-Loan and Work-MyApp, the system will check Work-MyApp-Loan first (more specific) before checking Work-MyApp (parent class).`,
        tags: ['Rule Resolution', 'Class Hierarchy', 'Rulesets']
      },
      {
        id: 5,
        question: "What are Declarative Rules and why are they important?",
        answer: `Declarative Rules in PEGA define "what" should happen rather than "how" it should happen. They automatically execute when their input values change.

**Types of Declarative Rules:**
1. **Declare Expression:** Calculate values based on other properties
2. **Declare Constraint:** Validate data and enforce business rules
3. **Declare Trigger:** Perform actions when conditions are met
4. **Declare Index:** Optimize database queries

**Key Benefits:**
- **Automatic Execution:** No need to explicitly call them
- **Dependency Management:** System tracks dependencies automatically
- **Performance:** Optimized execution by the platform
- **Maintainability:** Business logic centralized and reusable

**Example - Declare Expression:**
\`\`\`
Property: .TotalAmount
Expression: .BaseAmount + .TaxAmount + .ShippingAmount
\`\`\`

**Example - Declare Constraint:**
\`\`\`
Property: .CustomerAge
Condition: .CustomerAge >= 18
Message: "Customer must be 18 or older"
\`\`\`

**Best Practices:**
- Use for calculations and validations
- Avoid complex logic in expressions
- Be mindful of circular dependencies
- Test thoroughly as they execute automatically`,
        tags: ['Declarative Rules', 'Business Logic', 'Validation']
      }
    ],
    advanced: [
      {
        id: 6,
        question: "How do you optimize PEGA application performance?",
        answer: `PEGA application performance optimization involves multiple strategies across different layers:

**Database Optimization:**
- Use appropriate database indexes
- Optimize SQL queries generated by PEGA
- Use database partitioning for large tables
- Implement proper database maintenance

**Rule Optimization:**
- Minimize clipboard usage
- Use efficient rule types (avoid activities when possible)
- Optimize decision rules and decision trees
- Use declare expressions instead of activities for calculations

**System Architecture:**
- Implement proper caching strategies
- Use connection pooling effectively
- Optimize JVM settings
- Implement load balancing

**Application Design:**
- Design efficient class hierarchies
- Use data pages for reference data
- Implement proper exception handling
- Minimize database calls

**Monitoring Tools:**
- **PAL (Performance Analyzer):** Real-time performance monitoring
- **Database Trace:** Analyze SQL queries
- **Performance Profiler:** Identify bottlenecks
- **System Management Application:** Monitor system health

**Best Practices:**
- Regular performance testing
- Code reviews focusing on performance
- Proper indexing strategy
- Efficient data model design`,
        tags: ['Performance Tuning', 'PAL', 'Database Optimization']
      },
      {
        id: 7,
        question: "Explain PEGA DevOps and CI/CD implementation.",
        answer: `PEGA DevOps enables continuous integration and deployment for PEGA applications using automated pipelines.

**Key Components:**

**1. Deployment Manager:**
- Orchestrates deployments across environments
- Manages application versioning
- Provides deployment pipeline visualization
- Supports rollback capabilities

**2. Pipeline Stages:**
- **Build:** Create application packages
- **Test:** Automated testing (unit, integration, UAT)
- **Deploy:** Deploy to target environments
- **Validate:** Post-deployment validation

**3. Integration Points:**
- **Version Control:** Git integration for rules
- **CI Tools:** Jenkins, Azure DevOps, GitLab CI
- **Testing:** Automated test execution
- **Monitoring:** Performance and health checks

**Implementation Best Practices:**
- Use branch-based development
- Implement automated testing at each stage
- Use infrastructure as code
- Implement proper security scanning
- Monitor deployment metrics

**Pipeline Example:**
1. Developer commits code to feature branch
2. Automated build triggers
3. Unit tests execute
4. Merge to main branch triggers deployment pipeline
5. Deploy to QA environment
6. Run automated tests
7. Deploy to production on approval

**Benefits:**
- Faster time to market
- Reduced deployment risks
- Improved quality through automation
- Better collaboration between teams`,
        tags: ['DevOps', 'CI/CD', 'Deployment Manager']
      }
    ]
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const currentQuestions = interviewQuestions[selectedLevel as keyof typeof interviewQuestions];

  return (
    <>
      <Head>
        <title>PEGA Interview Questions & Answers | PegaStack</title>
        <meta 
          name="description" 
          content="Comprehensive PEGA interview questions and answers for all levels. Prepare for your PEGA developer interview with expert insights."
        />
        <meta name="keywords" content="PEGA interview questions, job interview, developer interview, PEGA Q&A" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pega-blue to-pega-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PEGA Interview Q&A
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive collection of PEGA interview questions and detailed answers. 
              Prepare for your next PEGA developer role with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Level Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-6 py-3 rounded-md font-semibold transition-all capitalize ${
                    selectedLevel === level
                      ? 'bg-pega-blue text-white shadow-md'
                      : 'text-gray-600 hover:text-pega-blue'
                  }`}
                >
                  {level} Level
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {currentQuestions.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Q{item.id}: {item.question}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="bg-pega-blue/10 text-pega-blue px-2 py-1 rounded text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedQuestion === item.id ? (
                        <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedQuestion === item.id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="prose prose-blue max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: item.answer.replace(/\n/g, '<br>') }} />
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-pega-blue to-pega-light text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Ace Your PEGA Interview?
              </h3>
              <p className="text-blue-100 mb-6">
                Practice with our comprehensive question bank and get personalized feedback
              </p>
              <button className="bg-white text-pega-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Mock Interview
              </button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
