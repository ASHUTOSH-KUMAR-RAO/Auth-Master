
"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export const BackButton =  ({href,label}:{href:string,label:string})=>{
  return (
      <Button
      asChild
      variant="link"
      
      >
        <Link href={href}>
        {label}
        </Link>
      </Button>
  )
}
