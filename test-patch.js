const axios = require('axios');

/** Change URL and body according to implementation. */
async function testPatchRequest() {
  try {
    const response = await axios.patch('http://localhost:3000/user', {
      name: 'Alice Johnson',
      email: 'alice@example.com'
    });
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

async function testPutSubjectRequest() {
  try{
    const response = await axios.put('http://localhost:3000/user', {
      id: 1,
      subjectIds: [1, 2, 3, 4]
    });
    console.log('Response data:', response.data);
  } catch(error){

  }
}

testPutSubjectRequest();
