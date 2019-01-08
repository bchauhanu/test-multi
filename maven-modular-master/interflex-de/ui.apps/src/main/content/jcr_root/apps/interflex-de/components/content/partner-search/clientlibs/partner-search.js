$(document).ready(function(){

	var app = new Vue({
		el: "#partner-search-app",
		data: function(){

			return {
				partnerJson: {"partnerweb": { "partners": [],"countries": [],"partnerType": []}},
				partnerPath: $('.component-partner-search').first().data("partner-path"),
				search: '',
				partners: [],
				selCountry: '',
				selPartnerType: '',
				clear: '',
				loading: true,
			    errored: false
			};
		},
		methods: {
			clearFilters: function (){
				this.search = "";
				this.selCountry ="";
				this.selPartnerType ="";
			},

		},    

		mounted: function() {
			axios
			.get(this.partnerPath+'.partners.json')
			.then(response => {
				var self = this;
				this.partnerJson = response.data;
			})
			.catch(error => {
		        console.log(error)
		        this.errored = true
		      })
		      .finally(() => this.loading = false)
		},

		computed: {
			filteredPartners: function() {
				var vm = this;
				var selCountry = vm.selCountry;
				var selPartnerType = vm.selPartnerType;
				var search = vm.search;

				if(search != ""){

					if(selCountry != "" && selPartnerType != "") {
						return vm.partnerJson.partnerweb.partners.filter(function(partner) {
							return (partner.tags.indexOf(selCountry) > -1  
									&& partner.tags.indexOf(selPartnerType) > -1
									&& partner.name.toLowerCase().includes(search.toLowerCase()));
						});
					} else if(selCountry != "" && selPartnerType == ""){
						return vm.partnerJson.partnerweb.partners.filter(function(partner) {
							return (partner.tags.indexOf(selCountry) > -1 
									&& partner.name.toLowerCase().includes(search.toLowerCase()));
						});
					}

					else if(selCountry == "" && selPartnerType != "") {
						return vm.partnerJson.partnerweb.partners.filter(function(partner) {
							return (partner.tags.indexOf(selPartnerType) > -1 
									&& partner.name.toLowerCase().includes(search.toLowerCase()));
						});
					} else {
						return vm.partnerJson.partnerweb.partners.filter(partner => {
							return partner.name.toLowerCase().includes(search.toLowerCase())
						})
					}

				} else {

					if(selCountry != "" && selPartnerType != "") {
						return vm.partnerJson.partnerweb.partners.filter(function(partner) {
							return (partner.tags.indexOf(selCountry) > -1  && partner.tags.indexOf(selPartnerType) > -1);
						});
					} else if(selCountry != "" && selPartnerType == ""){
						return vm.partnerJson.partnerweb.partners.filter(function(partner) {
							return (partner.tags.indexOf(selCountry) > -1);
						});
					}

					else if(selCountry == "" && selPartnerType != "") {
						return vm.partnerJson.partnerweb.partners.filter(function(partner) {
							return (partner.tags.indexOf(selPartnerType) > -1);
						});
					} else {
						return vm.partnerJson.partnerweb.partners;
					}
				}

			}
		}           

	});
});