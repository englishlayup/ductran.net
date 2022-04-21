import { FormEvent } from "react";

export default function PostForm() {
    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement) {
            const form = new FormData(event.target);
            const formData = Object.fromEntries(form.entries());
            console.log(formData);
            
            const res = await fetch('/api/posts', {
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const result = await res.json();
            console.log(result);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" type="text"/>
            <input name="date" type="date"/>
            <input name="description" type="text" />
            <textarea name="content"/>
            <input name="tags" type="text"/>
            <button type="submit">Publish Post</button>
        </form>
    );
}