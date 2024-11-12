const axios = require('axios');

async function testPostRequest() {
  try {
    const response = await axios.post('http://localhost:3000/user', {
      name: 'Test Test3',
      email: 'test@example.com',
      universityId: 2,
      subjects: ['Religion', 'Archeology', 'History']
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testPatchUniversity() {
  try {
    const response = await axios.patch('http://localhost:3000/user/1', {
      universityId: 2
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testPatchSubjects() {
  try {
    const response = await axios.patch('http://localhost:3000/user/1', {
      subjects: ['Arts', 'History', 'Computer Science', 'Maths']
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

//testPostRequest();
testPatchUniversity();
testPatchSubjects();