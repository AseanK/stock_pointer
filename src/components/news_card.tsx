'use client'

import {db} from '@/utils/firebase.tsx' 
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

async function fetch_news() {
	const querySnapshot = await getDocs(colletion(db, "news"));

	const data = [];
	querySnapshot.forEach((doc) => {
		data.push(id: doc.id, ...doc.data());
	})

	return data;
}

