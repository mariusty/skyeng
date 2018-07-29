exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  directConnect: true,
  params: {
        courseName: 'Spoken',
        levelName: 'Advanced',
        lessonName: 'Key to success',
  }
}
