import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMyContext } from '@/Provider/Context';
import { Computer, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
} from "@/components/ui/card"


const ProfileView = () => {
    const { username, setUsername, } = useMyContext();
    function randomFruit() {
        const fruits = ["apple", "banana", "orange", "grape", "mango", "strawberry", "blueberry", "kiwi", "pineapple", "watermelon"];
        const adjectives = ["sweet", "juicy", "delicious", "refreshing", "tangy", "aromatic", "vibrant", "succulent", "luscious", "tropical"];

        const randomFruitIndex = Math.floor(Math.random() * fruits.length);
        const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);

        const randomFruit = fruits[randomFruitIndex];
        const randomAdjective = adjectives[randomAdjectiveIndex];

        setUsername(`${randomAdjective} ${randomFruit}`)
    }
    useEffect(() => {
        randomFruit()
    }, [])
    return (

        <Card className=" max-w-sm">
            <CardContent className="h-16">
                <div className="flex h-16 items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="/avatars/01.png" />
                            <AvatarFallback><Computer/></AvatarFallback>
                        </Avatar>
                        <div className=''>
                            <p className="text-sm font-medium leading-none capitalize">{username}</p>
                            <p className="text-sm text-muted-foreground">username</p>
                        </div>
                    </div>
                    <Button variant={"ghost"} onClick={randomFruit}><RefreshCcw/></Button>
                </div>
            </CardContent>
        </Card>

    )
}

export default ProfileView