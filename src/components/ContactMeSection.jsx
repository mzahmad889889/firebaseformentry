import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import  * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";


const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { isOpen, type, message, onOpen, onClose} = useAlertContext();
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
     initialValues: { 
      firstName: '',
      email: '', 
      type: '',
      comment: '',
     }, 
     onSubmit: (values, action) => {
      {!isOpen?
        submit(values, action.resetForm()) && 
        onOpen('success',`Thanks for your submission ${values.firstName}, we will get back to you shortly!`):
        onOpen('error',response.message)}
        
      {response && (
        <div>
        {response.type === 'success' && <p>{response.message}</p>}
        {response.type === 'error' && <p>{response.message}</p>}
        </div>
      )}
 },
    validationSchema:Yup.object({
      firstName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid Email').required('Required'),
      comment: Yup.string().min(25).required('Required')

     }),
      
    });

  const handleSubmitOfData = async(e) => {
    e.preventDefault();
    const {firstName, email, type, comment} = values;
    const updatedValues = {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    };
    
    const res = await fetch("https://formvalidationstoredata-default-rtdb.firebaseio.com/formvalidationuserdata.json",
    {
        method: 'POST',
        header:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          email, 
          type, 
          comment
        })
    }
    ) 
    if(res){
     alert(`Successfully submitted Mrs. ${values.firstName}`)
  }
    else{
      console.log("Failed")
    }

  }      

  return (
    
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={4}
    >
      <VStack w="1024px" p={32} alignItems="center">
      <section id="contactme-section">  
       <h1 style={{margin: '-150px 0px 0px 0px'}}> Contact me</h1>
        <Box p={6} rounded="md" w="250%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.firstName && touched.firstName ? true:false}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  value={values.firstName}
                  onBlur={handleBlur}
                 />
                 <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email && touched.firstName ? true:false}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type"  name="type" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}>
                  <option style={{backgroundColor: 'black'}} value="hireMe">Freelance project proposal</option> 
                  <option style={{backgroundColor: 'black'}} value="openSource">
                    Open source consultancy session
                  </option>
                  <option style={{backgroundColor: 'black'}}  value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={errors.comment && touched.comment ? true : false}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comment}
                  
                />
                <FormErrorMessage>{errors.comment}</FormErrorMessage>
              </FormControl>
               <Button
               type="submit"
               onClick={handleSubmitOfData}
               isLoading={isLoading}
               colorScheme="purple"   width="full">
                Submit
              </Button>
             
            </VStack>
          </form>
        </Box>
        </section>
      </VStack>
    </FullScreenSection>
   
  );
};

export default LandingSection;