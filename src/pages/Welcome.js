import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../contexts/AuthContexts';
import MoneyForm from '../components/MoneyForm';
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

export default function Welcome() {
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        try {
          const categoriesQuery = query(collection(db, "categories"));
          const unsubscribeCategories = onSnapshot(categoriesQuery, (categoriesSnapshot) => {
            const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(categoriesData);
          });

          return () => {
            unsubscribeCategories();
          };

        } catch (e) {
          console.log("Error getting cached document:", e);
        }
      }
    }
    fetchData();
  }, [currentUser]);

  return (
    <Container className='text-center'>
      <h1 className='mx-5 my-4 color-welcome'>Welcome to Money Manager!</h1>
      
      {currentUser ? (
        <>
          <div className='bg-grey p-4 my-3'>
            <MoneyForm categories={categories} />
          </div>
          <LinkContainer to='/home'>
            <Button variant="warning">Show Records</Button>
          </LinkContainer>
        </>
      ) : (
        <>
          <LinkContainer to='/login'>
            <Button variant="warning">Login</Button>
          </LinkContainer>
        </>
      )}
      <div className='bg-img'>
      </div>
    </Container>
  );
}
