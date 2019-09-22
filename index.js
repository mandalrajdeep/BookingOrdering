var fileReader = (file) => {
    return require('./' + file + '.json').sort((a, b) => {
        if (a.start === b.start) {
            return a.end - b.end
        } else {
            return a.start - b.start
        }
    })
}

var createOrder = (trips) => {
    // console.log(trips)
    let journey = []
    let visited = new Array(trips.length).fill(false)
    for (let i =0; i < trips.length; i++) {
        if(!visited[trips[i].id]) {
            let relocationRequired = true
            for (let j = i; j < trips.length; j++) {
                let jid = trips[j].id
                if((j===0) || (!visited[jid] && (end === trips[j].start))) {
                    visited[jid] = true
                    end = trips[j].end
                    journey.push(jid) 
                    relocationRequired = false       
                }
            }
            if(relocationRequired) {
                // add counter her for total relocation
                visited[trips[i].id] = true
                journey.push(trips[i].id)     
                end = trips[i].end   
            }
        }
    }
    return journey
}

console.log(createOrder(fileReader('bookings')))