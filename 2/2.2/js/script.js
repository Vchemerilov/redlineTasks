const emptyUser = [
    {"id": 0, "firstname": "", "lastname": "", "email": "", "phone": "", "description": "", "address": "", "city": "", "state": "", "index": 0}
]
var app = new Vue({
    el:'#datatable',
    data: {
        sortParam: "",
        search: "",
        status:"",
        firstClick: true,
        fullTypeList:false,
        users: emptyUser,
        user: emptyUser,
        filterUsers: emptyUser,
        buttonVisibility:"visible",
        tableVisibility:"hidden",
        arrows:[
            String.fromCharCode(30),
            String.fromCharCode(30),
            String.fromCharCode(30),
            String.fromCharCode(30),
            String.fromCharCode(30)
        ],
    },
    methods: {
        loadQuote: function () {
            var req = this;
            var pathToJsonFile;
            req.status = "loading data";

            if (this.fullTypeList)
                pathToJsonFile = "https://my-json-server.typicode.com/Vchemerilov/redlineTasks/LongUsersList";
            else
                pathToJsonFile = "https://my-json-server.typicode.com/Vchemerilov/redlineTasks/ShortUsersList";

            axios.get(pathToJsonFile)
                .then(function (response) {
                    req.filterUsers = response.data;
                    req.users =  response.data;
                    req.user = response.data[0];
                    req.status = "data loaded";
                })
                .catch(function (error) {
                    req.status = 'error';
                });
        },

        selectUser:function(id){
            this.user = this.filterUsers.find(user => user.id == id);
        },

        searchButton() {
            let fUsers = this.users.filter(user => {
                return user.firstname.toLowerCase().indexOf(this.search.trim().toLowerCase()) > -1 })
            this.filterUsers = fUsers;
        },

        turnArrow:function(){
            return (this.firstClick) ? String.fromCharCode(30) : String.fromCharCode(31)
        },

        showArrow:function(){
            if (this.sortParam == 'id')
                Vue.set(app.arrows, 0, this.turnArrow());
            else
            if (this.sortParam == 'firstname')
                Vue.set(app.arrows, 1, this.turnArrow());
            else
            if (this.sortParam == 'lastname')
                Vue.set(app.arrows, 2, this.turnArrow());
            else
            if (this.sortParam == 'email')
                Vue.set(app.arrows, 3, this.turnArrow());
            else
            if (this.sortParam == 'phone')
                Vue.set(app.arrows, 4, this.turnArrow());
        }
    },
    computed: {
        sortedUsers() {
            switch (this.sortParam) {
                case 'id':
                    return this.filterUsers.sort((a,b) =>{
                        return (this.firstClick) ? a.id > b.id : a.id < b.id;
                    });
                case 'firstname':
                    return this.filterUsers.sort((a,b) =>{
                        return (this.firstClick) ? a.firstname.toLowerCase() > b.firstname.toLowerCase() : a.firstname.toLowerCase() < b.firstname.toLowerCase();
                    });
                case 'lastname':
                    return this.filterUsers.sort((a,b) =>{
                        return (this.firstClick) ? a.lastname.toLowerCase() > b.lastname.toLowerCase() : a.lastname.toLowerCase() < b.lastname.toLowerCase();
                    });
                case 'email':
                    return this.filterUsers.sort((a,b) =>{
                        return (this.firstClick) ? a.email.toLowerCase() > b.email.toLowerCase() : a.email.toLowerCase() < b.email.toLowerCase();
                    });
                case 'phone':
                    return this.filterUsers.sort((a,b) =>{
                        return (this.firstClick) ? a.phone.toLowerCase() > b.phone.toLowerCase() : a.phone.toLowerCase() < b.phone.toLowerCase();
                    });
                default:
                    return this.filterUsers;
            }
        },
    }
});