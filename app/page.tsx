import { CodeEditorWrapper } from "@/components/code-editor";

import {Header} from "@/components/header"; // Adjust the path if necessary

export default function Home() {
  return (
    <div>
      <Header />
      <CodeEditorWrapper />
    </div>
  );
}

//import { Header } from "@/components/header";

// export default function Home() {
//   return (
//     <>
//       <CodeEditorWrapper />
//     </>
//   );
// }
