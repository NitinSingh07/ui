import { NextRequest, NextResponse } from 'next/server';

const getWorkflows = () => {
  // In a real app, this would be a database call
  // For now, return empty array since we're using localStorage on client side
  return [];
};

const saveWorkflow = (workflow: any) => {
  // In a real app, this would save to database
  // For now, just return the workflow since localStorage is handled on client side
  return workflow;
};

export async function GET() {
  try {
    const workflows = getWorkflows();
    return NextResponse.json(workflows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workflows' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.type) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
    }

    // Create new workflow
    const newWorkflow = {
      id: Date.now(),
      name: body.name,
      description: body.description || '',
      type: body.type,
      status: body.status || 'draft',
      tag: body.tag || '',
      notificationType: body.notificationType || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save workflow (in real app, this would save to database)
    const savedWorkflow = saveWorkflow(newWorkflow);

    return NextResponse.json(savedWorkflow, { status: 201 });
  } catch (error) {
    console.error('Error creating workflow:', error);
    return NextResponse.json({ error: 'Failed to create workflow' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
    }

    // In a real app, this would update the database
    // For now, just return the updated data since localStorage is handled on client side
    const updatedWorkflow = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedWorkflow);
  } catch (error) {
    console.error('Error updating workflow:', error);
    return NextResponse.json({ error: 'Failed to update workflow' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
    }

    // In a real app, this would delete from database
    // For now, just return success since localStorage is handled on client side
    return NextResponse.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    console.error('Error deleting workflow:', error);
    return NextResponse.json({ error: 'Failed to delete workflow' }, { status: 500 });
  }
}
