new Vue({
    el: '#company-app',
    data: {
        companyList: null,
        isAddressShowed: false,
        sortedFilds: {
            fild: '',
            sortType: ''
        },
        companyAddress: null,
        showDrpdMenu: false,
        filteredFild: null,
        search: ''
    },
    created() {
        this.getJsonData().then( data => {
            this.companyList = data;
        })
        .catch( error => {
            console.log('Ошибка! Не могу связаться с API. ', error);
        });
    },
    watch: { 
        search(newString, oldString) {
            this.filteredCompanyList;
        }
    },
    methods: {
        async getJsonData() {
            const data = await fetch("http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2");
            return await data.json();
        },
        sort(element) {
            if (this.sortedFilds.sortType == '' || this.sortedFilds.sortType == 'DESK') {
                this.sortedFilds = { fild: element, sortType: 'ASK' };
                this.companyList.sort(( a, b ) => (a[element] > b[element]) ? -1 : 1);
            } else {
                this.sortedFilds = { fild: element, sortType: 'DESK' };
                this.companyList.sort(( a, b ) => (a[element] < b[element]) ? -1 : 1);
            }
        },
        showCompanyAddress(id, companyName) {
            this.companyAddress = this.companyList.find(elem => elem._id === id).address;
            this.companyAddress.companyName = companyName;
            this.isAddressShowed = true;
        },
        applyFilterBy(fildName) {
            this.filteredFild = fildName;
        }
    },
    computed: { 
        filteredCompanyList() {
            return this.filteredFild ? this.companyList.filter(fild => fild[this.filteredFild].includes(this.search)) :
                this.companyList;
            
        }
    }
});

