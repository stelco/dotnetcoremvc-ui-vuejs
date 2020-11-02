<template>
    <div id="form">
        <p>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" v-model="FullName" />
        </p>

        <p>
            <label>Email</label>
            <input type="text" placeholder="Enter your email" v-model="Email" />
            <span class="invalid-input" v-show="InvalidEmail">Invalid Email</span>
        </p>

        <p>
            <label>Comments</label>
            <textarea rows="10" placeholder="Enter some positive comments" v-model="Comments"></textarea>
        </p>

        <div id="form-buttons">
            <button type="button" class="danger" v-on:click="ResetForm">Reset Form</button>

            <button type="button" class="success" ref="SubmitButton" v-bind:disabled="isSubmitDisabled" v-on:click="SubmitForm">Submit Form</button>

        </div>
    </div>
</template>

<script>

    import { validateEmail } from './utils';

    export default {
        name: 'Form',
        data() {
            return {
                FullName: '',
                Email: '',
                Comments: '',
                InvalidEmail: false
            }
        },
        InvalidEmail: false,
        computed: {
            isSubmitDisabled() {
                let isDisabled = true;

                if (
                    this.FullName !== '' &&
                    this.Email !== '' &&
                    this.Comments !== ''
                ) {
                    isDisabled = false;
                }

                return isDisabled;
            }

        },
        methods: {
            ResetForm() {
                this.FullName = '';
                this.Email = '';
                this.Comments = '';
            },
            SubmitForm() {
                let submit = true;

                if (!validateEmail(this.Email)) {
                    this.InvalidEmail = true;
                    submit = false;
                } else {
                    this.InvalidEmail = false;
                }

                if (submit) {
                    axios({
                        method: 'post',
                        url: '/Home/SubmitedForm',
                        data: { "Fields": this.$data }
                    }).then(res => {
                        alert('Successfully submitted feedback form ');
                        this.$refs.SubmitButton.setAttribute("disabled", "disabled");
                    }).catch(err => {
                        alert(`There was an error submitting your form. See details: ${err}`);
                    });
                }
            }
        }
    }
</script>