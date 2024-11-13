<template>
    <div class="app">
        <Navbar />
        <div class="row justify-content-center">
            <div class="col-md-5">
                <h3 class="text-center">Update Subscription</h3>
                <form @submit.prevent="updateSubscription">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="subscription.name" required>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="subscription.description" required>
                    </div>

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
                        <button class="btn btn-primary btn-block" type="submit">Update Subscription</button>
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
    name: 'Edit',
    components: {
        Navbar
    },
    data() {
        return {
            subscription: {}
        }
    },
    created() {
        let dbRef = db.collection('subscriptions').doc(this.$route.params.id)
        dbRef.get().then((doc) => {
            this.subscription = doc.data();
            // Ensure yearStarted is defined to avoid errors if the field is missing
            if (!this.subscription.yearStarted) {
                this.subscription.yearStarted = '';
            }
        }).catch((error) => {
            console.log(error);
            alert('Error accessing database');
            this.$router.push('/');
        });
    },
    methods: {
        updateSubscription() {
            db.collection('subscriptions').doc(this.$route.params.id)
            .update(this.subscription).then(() => {
                this.$router.push('/subscriptionsList');
            }).catch((error) => {
                console.log(error);
                alert('Error updating subscription');
                this.$router.push('/subscriptionsList');
            });
        },
        cancelOperation() {
            this.$router.push('/subscriptionsList');
        }
    }
}
</script>
