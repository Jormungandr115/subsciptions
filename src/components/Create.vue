<template>
    <div class="app">
        <Navbar />
        <div class="row justify-content-center">
            <div class="col-md-5">
                <h3 class="text-center">Add Subscription</h3>
                <form @submit.prevent="addSubscription">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="subscription.name" required>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="subscription.description" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <label>Amount</label>
                        <input type="text" class="form-control" v-model="subscription.amount" required>
                    </div>

                    <div class="form-group">
                        <label>Payment Frequency</label>
                        <select id='frequency' class="form-control" v-model="subscription.frequency" required>
                            <option value='weekly'>Weekly</option>
                            <option value='bimonthly'>Bi-monthly</option>
                            <option value='monthly'>Monthly</option>
                            <option value='quarterly'>Quarterly</option>
                            <option value='biannually'>Bi-annually</option>
                            <option value='annually'>Annually</option>
                        </select>
                    </div>

                    <!-- New field for yearStarted -->
                    <div class="form-group">
                        <label>Year Started</label>
                        <input type="number" class="form-control" v-model="subscription.yearStarted" required>
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit">Add Subscription</button>
                        <button class="btn btn-primary col-4" @click="cancelOperation">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import db from '../firebaseDb'
import Navbar from '../components/Navbar.vue'

export default {
    name: 'Create',
    components: {
        Navbar
    },
    data() {
        return {
            subscription: {
                name: '',
                description: '',
                amount: '',
                frequency: '',
                yearStarted: '' // Initialize the new field
            },
            error: false,
            errorMsg: ''
        }
    },
    methods: {
        addSubscription() {
            // Ensure required fields are filled out
            if (this.subscription.name && this.subscription.description && this.subscription.yearStarted) {
                db.collection('subscriptions').add(this.subscription).then(() => {
                    // Clear the form fields after successful addition
                    this.subscription = { name: '', description: '', amount: '', frequency: '', yearStarted: '' };
                    this.$router.push('/subscriptionsList');
                }).catch(error => {
                    console.error("Error adding subscription:", error);
                    alert("Failed to add subscription.");
                });
            } else {
                this.error = true;
                this.errorMsg = "Please fill out all required fields.";
                setTimeout(() => {
                    this.error = false;
                }, 5000);
            }
        },
        cancelOperation() {
            this.$router.push('/subscriptionsList');
        }
    }
}
</script>
