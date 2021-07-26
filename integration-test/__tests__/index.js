const fetch = require('node-fetch');

//base url
const url = "http://localhost:8080/api/v1/shortener/"
const postData = async (path, data) => {
    const result = await fetch(`${url}${path}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const json = await result.json();
    json.status = result.status
    return json;
}

const getData = async (id, path) => {
    const result = await fetch(`${path ? path : url}/${id}`, {
        method: "get"
    })
    const json = await result.json();
    json.status = result.status
    return json;
}

describe("integration-test cases ", () => {
    test("error throws up on invalid url",async () => {
        let result = await postData('',{url : ""})
        expect(result.success).toBe("false")
        expect(result.messages).toBe('send a valid url')
        expect(result.status).toBe(400)

        //http[s] is required
        result = await postData('',{url : "www.google.com"})
        expect(result.success).toBe("false")
        expect(result.messages).toBe('send a valid url')
        expect(result.status).toBe(400)
    })

    test("stores the given url and return the details", async () => {
        let result = await postData('',{"url" : "http://www.google.com"})
        console.log(result)
        expect(result.success).toBe("true")
        expect(result.status).toBe(200)
        expect(result.shortened_url).toBe('http://localhost:8080/JT0UJ')
        const id = result.id

        //multiple post the same url
        await postData('',{"url" : "http://www.google.com"})
        await postData('',{"url" : "http://www.google.com"})
        result = await postData('',{"url" : "http://www.google.com"})

        //no new rows are inserted
        expect(result.shortened_url).toBe('http://localhost:8080/JT0UJ')
        expect(result.id).toBe(id)
    })

    test("error throws up on invalid number",async () => {
        let result = await getData('anto')
        expect(result.success).toBe("false")
        expect(result.messages).toBe('id should be a number')
        expect(result.status).toBe(400)

        result = await getData('1 1')
        expect(result.success).toBe("false")
        expect(result.messages).toBe('id should be a number')
        expect(result.status).toBe(400)
    })

    //TODO for some reason this is faling with async/await
    /*
    test("should redirect the given url",async (done) => {
        //post
        let post = await postData('',{"url" : "http://www.google.com"})
        fetch(post.shortened_url, {
            method: "get",
            redirect: 'follow'
        }).then((response) => {
            console.log(response.redirected)
            expect(response.redirected).toBe(true)
            done();
        }).catch((e) => console.log(e))

    })

     */
})