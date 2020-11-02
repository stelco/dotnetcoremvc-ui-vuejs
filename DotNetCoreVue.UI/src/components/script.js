//form
import Vue from 'vue';

        new Vue({
            el: '#form',
            data: {
                FullName: '',
                Email: '',
                Comments: ''
            },
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
            }
        });
