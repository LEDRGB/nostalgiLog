const fs = require('fs');

fs.readFile('epa-http.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    const lines = data.trim().split("\n");

    const formattedData =[] 
    lines.forEach(line => {
        let [host, datetime, requestInfo, responseCode, documentSize] = line.match(/(?:[^\s"]+|"[^"]*")+/g);


        const [day, hour, minute, second] = datetime.slice(1, -1).split(":");

        //The data must be sanitized to include all fields due to the requirements of the task. In the absence of a better solution, specific cases are treated.
        const splittedRequestInfo = requestInfo.split(" ")
        let [method, url, protocol] = splittedRequestInfo;
       

        if(splittedRequestInfo.length !== 3){
            if(splittedRequestInfo.length === 1){
                [method, url, protocol] = [undefined, splittedRequestInfo[0], undefined]
            }
            if(splittedRequestInfo.length > 3){
                method = splittedRequestInfo.shift()
                protocol = splittedRequestInfo.pop()
                url = splittedRequestInfo.join('')
            }           
        }
        if(responseCode === 'HTTP/1.0' ){
            const splittedLine = line.split(" ")
            documentSize = splittedLine.pop()
            responseCode = splittedLine.pop()
        }


        formattedData.push({
            host,
            datetime: {
                day,
                hour,
                minute,
                second
            },
            request: {
                method: method?.slice(1),
                url: url,
                protocol: protocol?.split('/')[0],
                protocol_version: protocol?.split('/')[1]?.slice(0, -1),                
            },
            response_code: responseCode,
            document_size: documentSize
        })
    }
  
    );
    const jsonData = JSON.stringify(formattedData, null, 2);

    // Write data to file
    fs.writeFile('formatted_data.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("Data has been written to formatted_data.json");
    });
})
