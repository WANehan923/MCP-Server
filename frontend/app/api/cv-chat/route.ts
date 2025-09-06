import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
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

    console.log('Calling MCP server:', `${mcpServerUrl}/api/cv-chat`);
    
    // Call MCP server
    const response = await fetch(`${mcpServerUrl}/api/cv-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    console.log('MCP server response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MCP server error:', errorText);
      throw new Error(`MCP server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('MCP server response:', data);
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('CV Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process CV chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
        mcpServerUrl: process.env.NEXT_PUBLIC_MCP_SERVER_URL
      },
      { status: 500 }
    );
  }
}