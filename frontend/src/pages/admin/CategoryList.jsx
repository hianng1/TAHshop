// import React from 'react'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from '../../components/Modal.jsx'
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
    const {data: categories, refetch} = useFetchCategoriesQuery();
    const [name, setName] = useState('');
    const [selectedCategory, setselectedCategory] = useState('');
    const [updatingName, setupdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const handleCreateCategory = async(e) => {
        e.preventDefault()
        if(!name) {
            toast.error('Category name is required!');
            return
        }
        try {
            const result = await createCategory({name}).unwrap();
            if(result.error){
                toast.error(result.error)
            }else{
                setName("");
                toast.success(`${result.name} is created`)
                refetch(); // Gọi refetch để cập nhật danh sách
            }
        } catch (error) {
            console.log(error)
            toast.error('Creating category failed, try again')
        }
    }
    const handleUpdateCategory = async(e) => {
        e.preventDefault();
        if(!updatingName){
            toast.error('Category name is required')
            return
        }
        try {
            const result = await updateCategory({categoryID: selectedCategory._id, updatedCategory:{
                name: updatingName
            }}).unwrap();
            if(result.error){
                toast.error(result.error)
            }else {
                toast.success(`${result.name} is updated`)
                setselectedCategory(null);
                setupdatingName('');
                setModalVisible(false);
                refetch();
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleDeleteCategory = async() => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error)
            }else{
                toast.success(`${result.name} is deleted.`)
                setselectedCategory(null)
                setModalVisible(false);
                refetch();
            }
        } catch (error) {
        
            console.log(error)
            toast.error('Category selection failed. Try again!')
        }


    }

    return <div className="ml-[10rem] flex flex-col md:felx-row">
        <div className="md:w-3/4 p-3">
            <AdminMenu/>
            <div className="h-12">Manage Categories</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
            <br />
            <hr />
            <div className="flex felx-wrap">
                {categories?.map((category) => (
                    <div key={category._id}>
                        <button className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" onClick={() => {
                            setModalVisible(true);
                            setselectedCategory(category);
                            setupdatingName(category.name);
                        }}>
                            {category.name}
                        </button>
                    </div>
                )) }
            </div>
                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm value={updatingName} setValue={value => setupdatingName(value)} handleSubmit={handleUpdateCategory} buttonText="Update" handleDelete={handleDeleteCategory}/>
                </Modal>
        </div>
    </div>;
};

export default CategoryList;
