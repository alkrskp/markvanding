import prisma from '../../../../lib/prisma'

export default async function handle(req, res) {
    const { mid } = req.query
    switch (req.method) {
        case "GET": 
            break;
        case "POST":
            var machine = await prisma.machines.update({
                where: {
                    id: mid
                },
                data: {
                    pumpname: null,
                    time: null,
                    active: 0
                }
            })

            console.log(machine)



            var pump = await prisma.pumps.findFirst({
                where: {
                    name: machine.pumpname
                }
            })

            await prisma.pumps.update({
                where: {
                    id: pump.id
                },
                data: {
                    active: 0
                }
            })
            
            // const payload = {
            //     sender: "23727415",
            //     message: pump.stopcode,
            //     recipients: [
            //         { msisdn: pump.number },
            //     ],
            // };

            // const apiToken = `hzWHQavUTHe6c0D6QaLyElvkCYp6c4Wbr5nYw6RVHV1pQCsNSMZnv204wYsNFqF_`;
            // const encodedAuth = Buffer.from(`${apiToken}:`).toString("base64");

            // const resp = await fetch("https://gatewayapi.com/rest/mtsms", {
            //     method: "post",
            //     body: JSON.stringify(payload),
            //     headers: {
            //         Authorization: `Basic ${encodedAuth}`,
            //         "Content-Type": "application/json",
            //     },
            // });
            // const json = await resp.json()
            
            // console.log(util.inspect(json, {showHidden: false, depth: null}));

            // if (resp.ok) {
            //     console.log("congrats! messages are on their way!");
            // } else {
            //     console.log("oh-no! something went wrong...");
            // }

            res.send("ENDED");

            break;
        case "DELETE":
            break;
        case "PUT":
            break;
    }    
}
