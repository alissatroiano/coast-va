const csvData = `
,,,,,,,,,,,
,,,,,,,,,,,
,,,,,,,,,,,
Team1,,1,,,,,,,,,
,,Team1,,0,,,,,,,
SAT 10 AM (1,,,,,,,,,,,
Team2,,0,,,,,,,,,
,,,,,,,,,,,
,,SUN 10 AM (5,,W-5,,0,,,,,
,,,,,,,,,,,
,,,,,,,,,,,
Team3,,0,,,,,,,,,
,,W-2,,0,,,,,,,
SAT 1 PM (2,,,,,,,,,,,
Team4,,0,,,,,,,,,
,,,,,,,,,,,
,,,,SUN 5 PM (7,,Champion,,,,,
,,,,,,Tournament Champion,,,,,
Team5,,0,,,,,,,,,
,,,,,,,,,,,
SAT 5 PM (3,,W-3,,0,,,,,,,
,,,,,,,,,,,
Team6,,0,,,,,,,,,
,,,,,,,,,,,
,,SUN 1 PM (6,,W-6,,0,,,,,
,,,,,,,,,,,
Team7,,0,,,,,,,,,
,,,,,,,,,,,
SAT 5 PM (4,,W-4,,0,,,,,,,
,,,,,,,,,,,
Team8,,0,,,,,,,,,
`.trim().split('\n');

generateBracketLayout(csvData.join('\n'));
