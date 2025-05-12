import { IncomingMessage, ServerResponse } from 'http';

export const handleUsersRoute = async(req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/api/users" && req.method === "GET") {
        // get all blogs
        const blogs = [
            {
                username:'Alex',
                age:'30'
            },
            {
                username:'Ktya',
                age:'19'
            }
        ]
     
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
     
        // send data
        res.end(JSON.stringify(blogs));
    }
};