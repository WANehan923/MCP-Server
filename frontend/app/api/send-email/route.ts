import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { recipient, subject, body } = await request.json();
    
    if (!recipient || !subject || !body) {
      return NextResponse.json(
        { error: 'Recipient, subject, and body are required' },
        { status: 400 }
      );
    }

    // Get MCP server URL from environment
    const mcpServerUrl = process.env.MCP_SERVER_URL || process.env.NEXT_PUBLIC_MCP_SERVER_URL;
    
    if (!mcpServerUrl) {
      return NextResponse.json(
        { error: 'MCP server URL not configured' },
        { status: 500 }
      );
    }

    // Call MCP server
    const response = await fetch(`${mcpServerUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, subject, body }),
    });

    if (!response.ok) {
      throw new Error(`MCP server responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Send Email API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}