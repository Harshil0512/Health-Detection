import ImageUpload from "@/components/custom_ui/ImageUploadForm";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
//   after submitting show loader LoadingWheel for some second  and redirect to dashboard
    
  return <div className="mt-5 flex flex-col align-middle justify-center">
    <ImageUpload/>
    <Button
        asChild
        style={{ alignSelf: "center", marginTop: "2rem"  }}
        className="max-w-[8rem]"
        variant={"default"}
      >
        <Link href={`/dashboard/${userId}`}>Submit</Link>
      </Button>
  </div>;
};

export default page;
