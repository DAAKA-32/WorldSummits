const fs = require('fs');
const path = require('path');

// Read mountains data
const mountainsPath = path.join(__dirname, '..', 'data', 'mountains.json');
const mountains = JSON.parse(fs.readFileSync(mountainsPath, 'utf-8'));

console.log('Analyzing Mountain Data Consistency\n');
console.log(`Total mountains: ${mountains.length}\n`);

const issues = [];
const stats = {
  total: mountains.length,
  missingImages: [],
  shortDescriptions: [],
  missingFirstAscent: [],
  missingDangers: [],
  missingFacts: [],
  missingAlternativeNames: [],
  inconsistentDescriptionLength: []
};

// Analyze each mountain
mountains.forEach((mountain, index) => {
  const mountainIssues = [];

  // Check images
  if (!mountain.images || mountain.images.length === 0) {
    mountainIssues.push('X No images');
    stats.missingImages.push(mountain.name);
  } else if (mountain.images.length < 2) {
    mountainIssues.push(`! Only ${mountain.images.length} image(s)`);
  }

  // Check description length
  if (!mountain.description) {
    mountainIssues.push('X No description');
    stats.shortDescriptions.push(mountain.name);
  } else if (mountain.description.length < 100) {
    mountainIssues.push(`! Short description (${mountain.description.length} chars)`);
    stats.shortDescriptions.push(mountain.name);
  } else if (mountain.description.length < 150) {
    stats.inconsistentDescriptionLength.push(`${mountain.name} (${mountain.description.length} chars)`);
  }

  // Check first ascent
  if (!mountain.firstAscent || !mountain.firstAscent.date || !mountain.firstAscent.climbers) {
    mountainIssues.push('X Missing first ascent info');
    stats.missingFirstAscent.push(mountain.name);
  }

  // Check dangers
  if (!mountain.dangers || mountain.dangers.length === 0) {
    mountainIssues.push('X No dangers listed');
    stats.missingDangers.push(mountain.name);
  } else if (mountain.dangers.length < 3) {
    mountainIssues.push(`! Only ${mountain.dangers.length} danger(s)`);
  }

  // Check facts
  if (!mountain.facts || mountain.facts.length === 0) {
    mountainIssues.push('X No facts listed');
    stats.missingFacts.push(mountain.name);
  } else if (mountain.facts.length < 3) {
    mountainIssues.push(`! Only ${mountain.facts.length} fact(s)`);
  }

  // Check alternative names
  if (!mountain.alternativeNames || mountain.alternativeNames.length === 0) {
    stats.missingAlternativeNames.push(mountain.name);
  }

  // Check required expedition data
  if (!mountain.expedition) {
    mountainIssues.push('X No expedition info');
  } else {
    if (!mountain.expedition.difficulty) {
      mountainIssues.push('X Missing difficulty');
    }
    if (!mountain.expedition.bestSeasons || mountain.expedition.bestSeasons.length === 0) {
      mountainIssues.push('X Missing best seasons');
    }
    if (!mountain.expedition.estimatedBudget) {
      mountainIssues.push('X Missing budget');
    }
  }

  if (mountainIssues.length > 0) {
    issues.push({
      index: index + 1,
      name: mountain.name,
      id: mountain.id,
      issues: mountainIssues
    });
  }
});

// Print results
console.log('\n=== ANALYSIS RESULTS ===\n');

if (issues.length === 0) {
  console.log('All mountains have complete and consistent data!\n');
} else {
  console.log(`Found issues in ${issues.length} mountains:\n`);

  issues.forEach(issue => {
    console.log(`\n${issue.index}. ${issue.name} (${issue.id})`);
    issue.issues.forEach(i => console.log(`   ${i}`));
  });
}

console.log('\n=== STATISTICS ===\n');

if (stats.missingImages.length > 0) {
  console.log(`Missing images (${stats.missingImages.length}):`);
  console.log(`   ${stats.missingImages.join(', ')}\n`);
}

if (stats.shortDescriptions.length > 0) {
  console.log(`Short/missing descriptions (${stats.shortDescriptions.length}):`);
  console.log(`   ${stats.shortDescriptions.join(', ')}\n`);
}

if (stats.missingFirstAscent.length > 0) {
  console.log(`Missing first ascent (${stats.missingFirstAscent.length}):`);
  console.log(`   ${stats.missingFirstAscent.join(', ')}\n`);
}

if (stats.missingDangers.length > 0) {
  console.log(`Missing dangers (${stats.missingDangers.length}):`);
  console.log(`   ${stats.missingDangers.join(', ')}\n`);
}

if (stats.missingFacts.length > 0) {
  console.log(`Missing facts (${stats.missingFacts.length}):`);
  console.log(`   ${stats.missingFacts.join(', ')}\n`);
}

if (stats.missingAlternativeNames.length > 0) {
  console.log(`No alternative names (${stats.missingAlternativeNames.length}):`);
  console.log(`   ${stats.missingAlternativeNames.join(', ')}\n`);
}

if (stats.inconsistentDescriptionLength.length > 0) {
  console.log(`Description length variations:`);
  stats.inconsistentDescriptionLength.forEach(d => console.log(`   ${d}`));
  console.log();
}

console.log(`\nComplete mountains: ${mountains.length - issues.length}/${mountains.length}`);
console.log(`Mountains with issues: ${issues.length}/${mountains.length}`);
console.log(`Completion rate: ${((mountains.length - issues.length) / mountains.length * 100).toFixed(1)}%\n`);
