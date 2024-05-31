<template>
    <main class="main">
        <article class="article">
            <!-- Section with image on background -->
            <section class="preview" :style="this.backgroundImageStyle">
                <div class="filter">
                    <div class="preview-content">
                        <h1 class="preview-content__title">
                            Test assignment for front-end developer
                        </h1>
                        <p class="preview-content__text">
                            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                        </p>
                        <Button class="preview-content__button button" msg="Sign up" type="yellow" @click="signUpAnchor"></Button>
                    </div>
                </div>
            </section>
            <section class="get container" id="get-section">
                <!-- Section "Working with GET" -->
                <div class="content">
                    <div class="content__title">
                        <h1>Working with GET request</h1>
                    </div>
                    <div class="content__cards">
                        <template v-for="user, i in users" :key="i">
                            <Card :info="user"></Card>
                        </template>
                    </div>
                    <preloader v-if="this.preloader == true"></preloader>
                    <Button v-if="this.showMoreButton == true && this.preloader == false" class="content__button button" msg="Show more" type="yellow" @click="showMore"></Button>
                </div>
            </section>
            <section class="post container" id="post-section">
                <!-- Section "Working with POST" -->
                <div class="content" v-if="this.userRegister == false">
                    <div class="content__title">
                        <h1>Working with POST request</h1>
                    </div>
                    <form action="POST" class="content__form user-form">
                        <div class="user-form-mainDate">
                            <dynamicInput
                                type="text" 
                                :value="this.userForm.name" 
                                placeholder="Your name" 
                                id="name"
                                name="name" 
                                :placeholderStyle="this.nameInputStyles"
                                @newText="checkName"
                            ></dynamicInput>
                            <dynamicInput 
                                type="email"
                                :value="this.userForm.email" 
                                placeholder="Email" 
                                name="email" 
                                id="email"
                                :placeholderStyle="this.emailInputStyles"
                                @newText="checkEmail"
                            ></dynamicInput>
                            <dynamicInput 
                                type="tel" 
                                :value="this.userForm.phone" 
                                placeholder="Phone" 
                                name="phone" 
                                required="true" 
                                id="tel"
                                :placeholderStyle="this.phoneInputStyles"
                                @newText="checkNumber"
                            ></dynamicInput>
                        </div>
                        <label for="tel" class="user-form__label-for-tel">+38 (XXX) XXX - XX - XX</label>
                        <div class="user-form-position">
                            <p class="user-form__text">Select your position</p>
                            <div class="form-check" v-for="position, i in positions" :key="i">
                                <input class="form-check-input" type="radio" name="position" id="flexRadioDefault1" :value="position.id" @change="setPosition($event)">
                                <label class="form-check-label" for="position">
                                    {{ position.name }}
                                </label>
                            </div>
                        </div>
                        <label class="upload-file">
                            <input type="file" name="file" accept=".jpeg,.jpg"  @change="this.newFile($event)"> 
                            <label for="file" class="upload-file__label">
                                <p class="upload-file__label__uploadButton">Upload</p>
                                <p class="upload-file__label__fileName">Upload your photo</p>
                            </label>
                            <p v-if="this.showErrorFileText === true" class="error_text"> Check if your image have size under 5MB or format is .jpeg or .jpg </p>
                        </label>
                    </form>
                    <Button class="content__button button" msg="Sign up" :type="checkType" @click="signUp"></Button>
                </div>
                <div class="success-register" v-else>
                    <h1 class="success-register__title">User successfully registered</h1>
                    <img class="success-register__img" src="../assets/images/success-image.svg" />
                </div>
            </section>
        </article>
    </main>
</template>

<script>
import Button from './Button.vue';
import Card from './Card.vue'
import dynamicInput from './dynamicInput.vue'
import {userBase} from '../API.js'
import { storeS } from '@/storeS';
import preloader from "./preloader.vue"

let apiServe = new userBase()

export default {
    data() {
        return {
            backgroundImage: require('@/assets/images/pexels.jpeg'),
            positions: [],
            users: [],
            filename: '',
            userForm: {
                name: '',
                email: '',
                position_id: '',
                phone: '',
                photo: ''
            },
            objParams: {
                page: 1,
                offset: 0,
                count: 6
            },
            total_pages: '',
            showMoreButton: true,
            showErrorFileText: false,
            emailInputStyles: '',
            phoneInputStyles: '',
            nameInputStyles: '',
            fullForm: {
                name: false,
                photo: false,
                phone: false,
                email: false,
                position: false
            },
            userRegister: false,
        }
    },
    methods: {
        signUpAnchor() {
            location.hash = 'post-section' // anchor to block
        },
        checkNumber(name, value) {
            this.userForm.phone = value
            if(!value.match(/^[\+]{0,1}380([0-9]{9})$/)) { // add error class if format is incorrect
                document.querySelector('#tel').classList.add('errorClass')
                document.querySelector('.user-form__label-for-tel').style.color = 'rgba(203, 61, 64, 1)'
                this.phoneInputStyles = 'color: rgba(203, 61, 64, 1)'
                this.fullForm.phone = false
            } else { // remove class if format is correct
                document.querySelector('#tel').classList.remove('errorClass')
                document.querySelector('.user-form__label-for-tel').style.color = 'rgba(126, 126, 126, 1)'
                this.phoneInputStyles = 'color: rgba(126, 126, 126, 1)'
                this.fullForm.phone = true
            }
        },
        checkName(name, value) {
            this.userForm.name = value
            if(value.length < 2 || value.length > 60) { // add error class if format is incorrect
                document.querySelector('#name').classList.add('errorClass')
                this.nameInputStyles = 'color: rgba(203, 61, 64, 1)'
                this.fullForm.name = false
            } else { // remove class if format is correct
                document.querySelector('#name').classList.remove('errorClass')
                this.nameInputStyles = 'color: rgba(126, 126, 126, 1)'
                this.fullForm.name = true
            }
        },
        checkEmail(name, value) {
            this.userForm.email = value
            if(
                !value.match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)
            ) {  // add error class if format is incorrect
                document.querySelector('#email').classList.add('errorClass')
                this.emailInputStyles = 'color: rgba(203, 61, 64, 1)'
                this.fullForm.email = false
            } else {  // remove error class if format is correct
                document.querySelector('#email').classList.remove('errorClass')
                this.emailInputStyles = 'color: rgba(126, 126, 126, 1)'
                this.fullForm.email = true
            }
        },
        signUp() {
            let form = new FormData()

            form.append('name', this.userForm.name)
            form.append('phone', this.userForm.phone)
            form.append('position_id', this.userForm.position_id)
            form.append('email', this.userForm.email)
            form.append('photo', this.userForm.photo)

            let headers = {
                'Token': storeS.token
            }

            apiServe.addUser(form, headers).then(result => {
                if(result.success === true) {
                    this.$toast.success('Success')

                    this.userRegister = true

                    this.objParams.page = 1
                    this.objParams.offset = 0
                    this.users = []
                    
                    this.getUsers()
                } else {
                    this.$toast.success('Error')
                }
            })
        },
        newFile(e) {
            if(!e) { // if file undefined\null, add error class
                e.target.nextSibling.childNodes.forEach(el => {
                    el.classList.add('errorClass')
                })
                this.showErrorFileText = true

                return
            }
            const formats = ['jpeg', 'jpgs']

            e.target.nextSibling.children[1].innerHTML = e.target.value.split('\\')[2] // add filename

            if(formats.indexOf(e.target.value.split('\\')[2].split('.')[1]) != -1) {
                if(e.target.files[0].size > 5000000) { // check size
                    e.target.nextSibling.childNodes.forEach(el => {
                        el.classList.add('errorClass') // add error class
                    })
                    this.showErrorFileText = true
                    this.fullForm.photo = false
                } else {

                    if(setTimeout(this.checkImageSize(e.target.files[0]) == true, 2000)) {
                        e.target.nextSibling.childNodes.forEach(el => {
                            el.classList.remove('errorClass') // if all good, remove class and approve photo
                        })
                        
                        this.showErrorFileText = false

                        this.userForm.photo = e.target.files[0]
                        this.fullForm.photo = true

                        this.$toast.success('Added Image')
                    }
                }
            } else {
                e.target.nextSibling.childNodes.forEach(el => {
                    el.classList.add('errorClass') // add error class
                })
                this.showErrorFileText = true
                this.fullForm.photo = false
            }
        },
        checkImageSize(e) {
            var _URL = window.URL || window.webkitURL;
            var file = e 
            var img;
            img = new Image();

            var objectUrl = _URL.createObjectURL(file);
            img.onload = function () { // check on 70x70
                if(this.width >= 70 && this.height >= 70) {
                    return true 
                } else {
                    return false
                }
            };
            img.src = objectUrl;
        },
        getPositions(){
            apiServe.getPositions().then(result => {
                if(result.success === true) {
                    this.positions = result.positions
                } else {
                    this.$toast.error('Failed to get positions')
                }
            })
        },
        getUsers() {
            apiServe.getUsers(this.objParams).then(result => {
                if(result.success === true) {
                    this.total_pages = result.total_pages
                    this.users = this.users.concat(result.users)
                    this.users = this.users.sort((a,b) => {new Date(b.registration_timestamp) - new Date(a.registration_timestamp)})

                    if(this.objParams.page < this.total_pages) {
                        this.objParams.page++
                        this.objParams.offset += this.objParams.count
                    } else if(this.objParams.page == this.total_pages) {
                        this.showMoreButton = false
                    }
                } else {
                    this.$toast.error("Failed to get users")
                }
            })
        },
        setPosition(event) {
            this.userForm.position_id = event.target.value
            this.fullForm.position = true
        },
        showMore() {
            this.getUsers()
        }
    },
    components: {
        Button,
        Card,
        dynamicInput,
        preloader
    },
    computed: {
        checkType() {
            if(Object.values(this.fullForm).indexOf(false) == -1) {
                return 'yellow'
            } else {
                return 'disabled'
            }
        },
        backgroundImageStyle() {
            return {
               backgroundImage: `url(${this.backgroundImage})`
            };
        },
        preloader() {
            return storeS.preloader
        }
    },
    created() {
        this.getPositions()
        this.getUsers()
    }
}
</script>