const axios = require('axios');

async function testPostUniversityRequest() {
  try {
    const response = await axios.post('http://localhost:3000/university', {
      name: 'Sofia University',
      town: 'Sofia'
    });
    console.log('Response data:', response.data);

    const response1 = await axios.post('http://localhost:3000/university', {
      name: 'Technical University',
      town: 'Sofia'
    });
    console.log('Response data:', response1.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testPostSubjectRequest() {
  try {
    const response = await axios.post('http://localhost:3000/subject', {
      name: 'History'
    });
    console.log('Response data:', response.data);

    const response1 = await axios.post('http://localhost:3000/subject', {
      name: 'Philosophy'
    });
    console.log('Response data:', response1.data);

    const response2 = await axios.post('http://localhost:3000/subject', {
      name: 'Archaeology'
    });
    console.log('Response data:', response2.data);

    const response3 = await axios.post('http://localhost:3000/subject', {
      name: 'Psychology'
    });
    console.log('Response data:', response3.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testPostUserRequest() {
  try {
    const response = await axios.post('http://localhost:3000/user', {
      name: 'John Doesh',
      email: 'johndoe@example.com',
      universityId: 1,
      subjectIds: [1, 2],
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
(async () => {
  await testPostUniversityRequest();
  await testPostSubjectRequest();
  await testPostUserRequest()
})()