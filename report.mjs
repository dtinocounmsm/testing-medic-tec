import reporter from "cucumber-html-reporter";

const options = {
	theme: "bootstrap",
	jsonFile: "cucumber-report/report.json",
	output: "cucumber-report/index2.html",
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: false,
	metadata: {
		"App Version": "1.0.0",
		"Test Environment": "STAGING",
		Browser: "Chrome  54.0.2840.98",
		Platform: "Mac OS",
		Parallel: "Scenarios",
		Executed: "Remote",
	},
	failedSummaryReport: true,
};

reporter.generate(options);
