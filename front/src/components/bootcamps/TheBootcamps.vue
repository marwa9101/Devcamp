<template>
  <base-card>
    <base-button
      @click="getAllBootcamps('all-bootcamps')"
      :mode="allBootcampsBtnMode"
      >All bootcamps</base-button
    >
    <base-button
      @click="setSelectedTab('add-bootcamp')"
      :mode="addBootcampBtnMode"
      >Add a bootcamp</base-button
    >
  </base-card>
  <component :is="selectedTab"></component>
</template>

<script>
import AddBootcamp from './AddBootcamp.vue';
import AllBootcamps from './AllBootcamps.vue';
import axios from 'axios';

export default {
  components: {
    AddBootcamp,
    AllBootcamps,
  },
  data() {
    return {
      selectedTab: '',
      bootcamps: [],
    };
  },
  provide() {
    return {
      bootcamps: this.bootcamps,
      addNewBootcamp: this.addNewBootcamp,
    };
  },
  computed: {
    allBootcampsBtnMode() {
      return this.selectedTab === 'all-bootcamps' ? 'selected' : null;
    },
    addBootcampBtnMode() {
      return this.selectedTab === 'add-bootcamp' ? 'selected' : null;
    },
    allBootcampsBtnClicked() {
      return this.selectedTab === 'all-bootcamps' ? 'selected' : null;
    },
    addBootcampBtnClicked() {
      return this.selectedTab === 'add-bootcamp' ? 'selected' : null;
    },
  },
  methods: {
    getAllBootcamps(tab) {
      this.selectedTab = tab;
      axios
        .get('http://localhost:5000/api/v1/bootcamps')
        .then((response) => {
          const boots = response.data.data;
          boots.forEach((boot) => {
            const bootcampExists = this.bootcamps.some((bootcamp) => {
              return bootcamp.id === boot.id;
            });
            if (!bootcampExists) {
              this.bootcamps.push(boot);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    addNewBootcamp(name, description, website, phone, email, address) {
      const newBootcamp = {
        name: name,
        description: description,
        website: website,
        phone: phone,
        email: email,
        address: address,
      };
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkN2E1MTRiNWQyYzEyYzc0NDliZTA0NSIsImlhdCI6MTY5NzcxOTg3MiwiZXhwIjoxNzAwMzExODcyfQ.w5HioSXhxMG_N9BYzbP0Ho6q9bMf3-eRzlJ11MM2_do';
      // Configuration de l'en-tête d'autorisation
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Configuration de la requête Axios
      const config = {
        headers: headers,
      };
      axios
        .post('http://localhost:5000/api/v1/bootcamps', newBootcamp, config)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      this.bootcamps.push(newBootcamp);
      axios
        .get('http://localhost:5000/api/v1/bootcamps')
        .then((response) => {
          const boots = response.data.data;
          boots.forEach((boot) => {
            const bootcampExists = this.bootcamps.some((bootcamp) => {
              return bootcamp.id === boot.id;
            });
            if (!bootcampExists) {
              this.bootcamps.push(boot);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.selectedTab = 'all-bootcamps';
    },
  },
};
</script>
<style>
a {
  text-decoration: none;
  color: #640032;
  font-weight: 600;
  font-size: 14px;
}
.selected {
  color: white;
  border-color: #640032;
}

a:hover {
  color: white;
}
</style>
