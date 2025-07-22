document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("decisionForm");
  const result = document.getElementById("result");
  const resultContent = document.getElementById("resultContent");
  const startOverBtn = document.getElementById("startOver");

  // PDF-Perfect Scenario Definitions
  const scenarios = {
    A: {
      condition: (c,d,m,r) => c === "yes" && d === "yes" && m === "yes" && r === "yes",
      steps: [
        "Complete Commandant Packet & Pre-Agno/Immert Course (PAC)",
        "Search Basic Commandant Training Academy (BCTA)",
        "Apply for TAG Letter",
        "Submit Form 14-4 with fees to CTC",
        "Enroll in a credential program to begin clearing the 5-Year Preliminary DSSSBMDC"
      ]
    },
    B: {
      condition: (c,d,m,r) => c === "yes" && d === "yes" && m === "yes" && r === "no",
      steps: [
        "Complete Commandant packet, PAC and BCTA",
        "Serve as a Commandant for one period (after-school or one period elective)",
        "Apply for TAG Letter once 1 year recency is achieved",
        "Enroll in credential program"
      ]
    },
    C: {
      condition: (c,d,m,r) => c === "yes" && d === "yes" && m === "no",
      steps: [
        "Complete Commandant packet, PAC and BCTA",
        "Serve as a Commandant for 4 consecutive years to satisfy military equivalency (per CR 1-9)",
        "Apply for TAG Letter after 4 years",
        "Enroll in credential program"
      ]
    },
    D: {
      condition: (c,d,m,r) => c === "yes" && d === "no" && m === "no",
      steps: [
        "Complete Commandant packet, PAC and BCTA",
        "Enroll in college and pursue bachelor’s degree (higher pay discussion)",
        "Gain 4 years of service as a CACC Commandant (to meet experience requirement)",
        "Apply for TAG Letter",
        "Enroll in credential program"
      ]
    },
    E: {
      condition: (c,d,m,r) => c === "yes" && d === "no" && m === "yes" && r === "no",
      steps: [
        "Complete Commandant packet, PAC and BCTA",
        "Serve as a Commandant for one period (after-school or one period elective)",
        "Apply for TAG Letter after recency is met (1 year within last 3 years)",
        "Enroll in credential program"
      ]
    },
    F: {
      condition: (c,d,m,r) => c === "no" && d === "no" && m === "yes" && r === "yes",
      steps: [
        "Complete Commandant packet, PAC and BCTA",
        "Apply for TAG Letter",
        "Get hired by a school (job offer required for credential program admission)",
        "Enroll in a DSSSBMDC credential program",
        "Begin coursework toward 5-Year Preliminary credential"
      ]
    },
    G: {
      condition: (c,d,m,r) => c === "no" && d === "yes" && m === "yes",
      steps: [
        "Complete Commandant packet, PAC and BCTA",
        "Apply for TAG Letter after BCTA",
        "Get hired by a school (job offer required for credential program admission)",
        "Enroll in a DSSSBMDC credential program",
        "Begin coursework toward 5-Year Preliminary credential"
      ]
    },
    H: {
      condition: (c,d,m,r) => c === "no" && d === "no" && m === "no",
      steps: [
        "Complete Commandant packet, PAC and BCTA",
        "Enroll in college and work toward bachelor’s degree (pay discussion)",
        "Volunteer and become an assistant Commandant to gain exposure and work toward 4 years of military.",
        "Apply for TAG Letter once experience is met",
        "Enroll in credential program when eligible"
      ]
    }
  };

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // More robust input collection using FormData
    const formData = new FormData(form);
    const credential = formData.get("credential");
    const degree = formData.get("degree");
    const military4 = formData.get("military4");
    const recent1 = formData.get("recent1");

    // Validate all questions answered
    if (!credential || !degree || !military4 || !recent1) {
      resultContent.innerHTML = "Please answer all questions to proceed.";
      result.classList.remove('hidden');
      return;
    }

    // Match scenario
    let steps = [];
    let scenarioMatched = false;
    
    for (const [scenario, config] of Object.entries(scenarios)) {
      if (config.condition(credential, degree, military4, recent1)) {
        steps = config.steps;
        scenarioMatched = true;
        break;
      }
    }

    // Fallback for unexpected combinations
    if (!scenarioMatched) {
      steps = [
        "We couldn't determine a clear path based on your answers.",
        "Please contact our support team for personalized guidance."
      ];
    }

    // Display results
    resultContent.innerHTML = steps.map(step => 
      `<div class="step">${step}</div>`
    ).join('');
    
    result.classList.remove('hidden');
    result.scrollIntoView({ behavior: 'smooth' });
  });

  // Reset form
  startOverBtn.addEventListener('click', function() {
    form.reset();
    result.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
