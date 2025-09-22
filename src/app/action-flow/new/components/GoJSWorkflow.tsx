'use client';

import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';

interface GoJSWorkflowProps {
  workflowNode?: any;
  recipientsNode?: any;
  conditionNode?: any;
  falseBranchNodes?: any[];
  trueBranchNodes?: any[];
  conditionSaved?: boolean;
  onFalseBranchClick?: () => void;
  onTrueBranchClick?: () => void;
}

const GoJSWorkflow: React.FC<GoJSWorkflowProps> = ({
  workflowNode,
  recipientsNode,
  conditionNode,
  falseBranchNodes = [],
  trueBranchNodes = [],
  conditionSaved = false,
  onFalseBranchClick,
  onTrueBranchClick,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;

    const $ = go.GraphObject.make;

    // Create the diagram
    const diagram = $(go.Diagram, divRef.current, {
      'undoManager.isEnabled': false,
      'animationManager.isEnabled': false,
      allowCopy: false,
      allowDelete: false,
      allowMove: false,
      allowSelect: false,
      allowZoom: true,
      allowHorizontalScroll: true,
      allowVerticalScroll: true,
      initialContentAlignment: go.Spot.Center,
      layout: $(go.TreeLayout, {
        angle: 90,
        layerSpacing: 80,
        nodeSpacing: 20,
        alignment: go.TreeLayout.AlignmentCenterChildren,
        arrangement: go.TreeLayout.ArrangementHorizontal,
      }),
      'toolManager.hoverDelay': 100,
      'toolManager.toolTipDuration': 2000,
    });

    // Hide GoJS evaluation text
    diagram.div.style.position = 'relative';
    const style = document.createElement('style');
    style.textContent = `
      .gojs-eval, .gojs-evaluation, [class*="gojs-eval"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Define the node template with icons
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      {
        selectable: false,
        fromSpot: go.Spot.Bottom,
        toSpot: go.Spot.Top,
      },
      $(go.Shape, 'RoundedRectangle', {
        fill: '#ffffff',
        stroke: '#d1d5db',
        strokeWidth: 1,
        minSize: new go.Size(200, 56),
      }),
      $(
        go.Panel,
        'Table',
        { margin: 10 },
        $(
          go.Panel,
          'Horizontal',
          { row: 0, column: 0, alignment: go.Spot.Left },
          $(
            go.TextBlock,
            {
              font: 'bold 14px sans-serif',
              stroke: '#1f2937',
              row: 0,
              column: 0,
            },
            new go.Binding('text', 'name')
          )
        ),
        $(
          go.TextBlock,
          {
            font: '12px sans-serif',
            stroke: '#6b7280',
            row: 1,
            column: 0,
            margin: new go.Margin(4, 0, 0, 0),
            maxLines: 2,
            overflow: go.TextOverflow.Ellipsis,
          },
          new go.Binding('text', 'description')
        )
      )
    );

    // Define the link template with proper arrows
    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.Orthogonal,
        corner: 5,
        selectable: false,
        fromSpot: go.Spot.Bottom,
        toSpot: go.Spot.Top,
      },
      $(go.Shape, {
        stroke: '#9ca3af',
        strokeWidth: 2,
      }),
      $(
        go.TextBlock,
        {
          font: '12px sans-serif',
          stroke: '#6b7280',
          segmentIndex: 0,
          segmentFraction: 0.3,
          segmentOffset: new go.Point(0, -15),
        },
        new go.Binding('text', 'label')
      )
    );

    // Create the model data
    const nodeDataArray: any[] = [];
    const linkDataArray: any[] = [];

    let nodeId = 1;

    // Add workflow nodes
    let workflowKey = null;
    if (workflowNode) {
      workflowKey = nodeId++;
      nodeDataArray.push({
        key: workflowKey,
        name: workflowNode.name,
        description: workflowNode.description,
        category: 'handler',
      });
    }

    let recipientsKey = null;
    if (recipientsNode) {
      recipientsKey = nodeId++;
      nodeDataArray.push({
        key: recipientsKey,
        name: recipientsNode.name,
        description: recipientsNode.description,
        category: 'recipients',
      });

      // Link to recipients
      if (workflowNode && workflowKey) {
        linkDataArray.push({
          from: workflowKey,
          to: recipientsKey,
        });
      }
    }

    let conditionKey = null;
    if (conditionNode) {
      conditionKey = nodeId++;
      nodeDataArray.push({
        key: conditionKey,
        name: conditionNode.name,
        description: conditionNode.description,
        category: 'condition',
      });

      // Link to condition
      if (recipientsNode && recipientsKey) {
        linkDataArray.push({
          from: recipientsKey,
          to: conditionKey,
        });
      } else if (workflowNode && workflowKey) {
        linkDataArray.push({
          from: workflowKey,
          to: conditionKey,
        });
      }
    }

    // Add condition branches
    if (conditionSaved && conditionNode && conditionKey) {
      // False branch
      if (falseBranchNodes.length > 0) {
        const channelKey = nodeId++;
        nodeDataArray.push({
          key: channelKey,
          name: 'Channel',
          description: 'Push, Whatsapp, Email select...',
          category: 'channel',
        });

        linkDataArray.push({
          from: conditionKey,
          to: channelKey,
          label: 'False',
        });

        // Sub-nodes from Channel
        const pushKey = nodeId++;
        const emailKey = nodeId++;
        const whatsappKey = nodeId++;

        nodeDataArray.push(
          {
            key: pushKey,
            name: 'Push',
            description: 'Send via APNs',
            category: 'push',
          },
          {
            key: emailKey,
            name: 'Email',
            description: 'Send via Sendgrid.',
            category: 'email',
          },
          {
            key: whatsappKey,
            name: 'Whatsapp',
            description: 'Send via One Signal',
            category: 'whatsapp',
          }
        );

        // Links from Channel to sub-nodes
        linkDataArray.push(
          { from: channelKey, to: pushKey },
          { from: channelKey, to: emailKey },
          { from: channelKey, to: whatsappKey }
        );

        // API request under Email
        const apiKey = nodeId++;
        nodeDataArray.push({
          key: apiKey,
          name: 'API request',
          description: 'GET https://www.example.com',
          category: 'api',
        });

        linkDataArray.push({
          from: emailKey,
          to: apiKey,
        });
      }

      // True branch
      if (trueBranchNodes.length > 0) {
        const digestKey = nodeId++;
        const inappKey = nodeId++;
        const delayKey = nodeId++;
        const rewardsKey = nodeId++;

        nodeDataArray.push(
          {
            key: digestKey,
            name: 'Digest',
            description: 'Digest logic and template',
            category: 'digest',
          },
          {
            key: inappKey,
            name: 'In app',
            description: 'Send via DOKAAI In app',
            category: 'inapp',
          },
          {
            key: delayKey,
            name: 'Delay',
            description: 'wait for 30 min',
            category: 'delay',
          },
          {
            key: rewardsKey,
            name: 'Rewards node',
            description: '#733373737',
            category: 'rewards',
          }
        );

        // Links for True branch
        linkDataArray.push(
          {
            from: conditionKey,
            to: digestKey,
            label: 'True',
          },
          { from: digestKey, to: inappKey },
          { from: inappKey, to: delayKey },
          { from: delayKey, to: rewardsKey }
        );
      }
    }

    // Set the model
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    // Cleanup function
    return () => {
      diagram.div = null;
    };
  }, [
    workflowNode,
    recipientsNode,
    conditionNode,
    falseBranchNodes,
    trueBranchNodes,
    conditionSaved,
  ]);

  return (
    <div className="w-full h-full">
      <div ref={divRef} className="w-full h-full" />
    </div>
  );
};

export default GoJSWorkflow;
