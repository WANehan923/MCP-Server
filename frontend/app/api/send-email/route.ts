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
    const mcpServerUrl = process.env.NEXT_PUBLIC_MCP_SERVER_URL;
    
    if (!mcpServerUrl) {
      return NextResponse.json(
        { error: 'MCP server URL not configured. Please set NEXT_PUBLIC_MCP_SERVER_URL environment variable.' },
        { status: 500 }
      );
    }

    console.log('Calling MCP server for email:', `${mcpServerUrl}/api/send-email`);

    // Call MCP server
    const response = await fetch(`${mcpServerUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ recipient, subject, body }),
    });

    console.log('Email API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MCP server email error:', errorText);
      throw new Error(`MCP server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Email API response:', data);
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('Send Email API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
        mcpServerUrl: process.env.NEXT_PUBLIC_MCP_SERVER_URL
      },
      { status: 500 }
    );
  }
}