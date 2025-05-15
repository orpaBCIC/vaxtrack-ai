// src/app/add-child/page.tsx
import { AddChildForm } from '@/components/child/add-child-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddChildPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Add New Child Profile</CardTitle>
          <CardDescription>Enter your child's information to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddChildForm />
        </CardContent>
      </Card>
    </div>
  );
}
