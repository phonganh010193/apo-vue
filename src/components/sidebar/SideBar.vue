<template>
    <div class="sidebar-container">
        <div className="sidebar-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            <h5>Danh Mục Sản Phẩm</h5>
        </div>
        <div className="sidebar-content">
            <router-link v-for="(item) in category" :key="item.id" :to="{ name: 'perfume', params: { id: item.id }}">{{ item.categoryName }}</router-link>
        </div>
    </div>
</template>
<script>
import { get, ref, } from 'firebase/database';
import { database } from "../../firebase";
export default {
    
    data() {
        return {
            category: null
        }
    },

    mounted() {
        get(ref(database, 'Category')).then((snapshot) => {
        if (snapshot.exists()) {
            this.category = Object.values(snapshot.val());
        }})
        .catch((error) => {
            console.error(error);
        });
    },
    
}
</script>
<style>
    .sidebar-container {
        width: 30%;
    }
    .sidebar-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        background-color: #2d8356;
        width: 100%;
        /* justify-content: center; */
    }
    .sidebar-title h5 {
        margin: 0;
        margin-left: 40px;
        font-size: 18px;
    }

    .sidebar-content {
        width: 100%;
        height: 395px;
        background-color: black;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
        color: white;
    }

    .sidebar-content a {
        float: left;
        color: #fdf8f8;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 15px;
    }

   
    .sidebar-content a:hover {
        background-color: #ddd;
        color: black;
    } 

    .sidebar-content::-webkit-scrollbar {
        width: 10px;
    }
    
    /* Track */
    .sidebar-content::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
        background-color: gray;
    }
    
    /* Handle */
    .sidebar-content::-webkit-scrollbar-thumb {
        background: #2d8356; 
        border-radius: 10px;
    }
    
    /* Handle on hover */
    .sidebar-content::-webkit-scrollbar-thumb:hover {
        background: rgb(84, 82, 82); 
    }

</style>