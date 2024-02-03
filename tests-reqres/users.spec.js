import { test, expect} from '@playwright/test'

test.describe('Users', () => {
  
  test('GET Request - Get User Detail. @regression ', async ({ request }) => {

    // Call API endpoint
    const response = await request.get(`users/2`)
    
    // Extract the Response Body
    const responseBody = JSON.parse(await response.text())

    // Print the Response Data in console for debugging purposes
    console.log(responseBody);
    
    // Assertions to validate the response
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.first_name).toBe('Janet')
    expect(responseBody.data.last_name).toBe('Weaver')
    expect(responseBody.data.email).toBeTruthy()

  })

  test('POST Request - Create New User. @regression @sanity', async ({ request }) => {

    // Call API endpoint
    const response = await request.post(`user`, {
      // Request Body
      data: {
        id: 1111,
      }
    })

    // Extract the Response Body
    const responseBody = JSON.parse(await response.text())

    // Print the Response Data in console for debugging purposes
    console.log(responseBody);
        
    // Assertions to validate the response
    expect(responseBody.id).toBe(1111)
    expect(responseBody.createdAt).toBeTruthy()
    
  })

  test('PUT Request - Update User. @regression @sanity', async ({ request }) => {

    // Call API endpoint
     const response = await request.put(`users/2`, {
      // Request Body
      data: {
        name: 'test name - updated',
        job: 'test job - updated',
      },
    })
    
    // Extract the Response Body
    const responseBody = JSON.parse(await response.text())

    // Print the Response Data in console for debugging purposes
    console.log(responseBody);
    
    // Assertions to validate the response
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('test name - updated')
    expect(responseBody.job).toBe('test job - updated')
    expect(responseBody.updatedAt).toBeTruthy()
  
  })

  test('DELETE Request - Delete User. @regression', async ({ request }) => {
 
    // Call API endpoint
    const response = await request.delete(`users/2`)
 
    // Assertions to validate the response
    expect(response.status()).toBe(204)
    
  })

})