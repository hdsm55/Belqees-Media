import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    return NextResponse.json({ id, message: 'Media item fetch' });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    return NextResponse.json({ id, message: 'Media item deleted' });
}
