const SearchController = {
    search: async(req, res) => {
        try{
            const query =  req.query.queries;
            console.log(query);
            res.status(201).json(query);
        }catch(e){
            res.status(500).json({ message: 'Server error' });
            console.log(e);
        }
    }
}
module.exports = SearchController;