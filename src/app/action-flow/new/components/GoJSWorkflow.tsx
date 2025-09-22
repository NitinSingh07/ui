'use client';

import React, { useEffect, useRef } from 'react';
import * as go from 'gojs';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PeopleIcon from '@mui/icons-material/People';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ApiIcon from '@mui/icons-material/Api';
import SettingsIcon from '@mui/icons-material/Settings';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

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

    // Create icon URLs for Material-UI icons
    const createIconUrl = (iconName: string) => {
      return `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#6b7280">
          <path d="${getIconPath(iconName)}"/>
        </svg>
      `)}`;
    };

    const getIconPath = (iconName: string) => {
      const iconPaths: { [key: string]: string } = {
        flash: 'M7 2v11h3v9l7-12h-4l4-8z',
        people:
          'M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5c-.47-.62-1.21-.99-2.01-.99H2.46c-.8 0-1.54.37-2.01.99L0 10.5v9.5h2v-6h2.5l2.54 7.63A1.5 1.5 0 0 0 7.46 22H9c.8 0 1.54-.37 2.01-.99L12 19.5c.47.62 1.21.99 2.01.99h1.54c.8 0 1.54-.37 2.01-.99L18 19.5c.47.62 1.21.99 2.01.99h1.54c.8 0 1.54-.37 2.01-.99L24 19.5v-9.5h-2v6h-2.5z',
        help: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
        email:
          'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
        notifications:
          'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
        whatsapp:
          'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488',
        api: 'M14 12h-4v-2h4v2zm6-4v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2zm-2 0H6v8h12V8zm-8 6h2v-2H10v2zm4 0h2v-2h-2v2z',
        settings:
          'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
        phone:
          'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
        schedule:
          'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
        gift: 'M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z',
      };
      return iconPaths[iconName] || iconPaths['help'];
    };

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
        layerSpacing: 30,
        nodeSpacing: 15,
        alignment: go.TreeLayout.AlignmentCenterChildren,
        arrangement: go.TreeLayout.ArrangementHorizontal,
      }),
      'toolManager.hoverDelay': 100,
      'toolManager.toolTipDuration': 2000,
    });

    // Hide GoJS evaluation text
    if (diagram.div) {
      diagram.div.style.position = 'relative';
    }
    const style = document.createElement('style');
    style.textContent = `
      .gojs-eval, .gojs-evaluation, [class*="gojs-eval"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Define the node template with icons and left border
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
        stroke: null,
        strokeWidth: 0,
        minSize: new go.Size(200, 56),
      }),
      // Left border - 3px left side only, exact left edge
      $(go.Shape, 'Rectangle', {
        fill: '#BBBBBB',
        width: 3,
        height: 56,
        alignment: go.Spot.Left,
        margin: new go.Margin(0, 0, 0, -1),
        strokeWidth: 0,
      }),
      $(
        go.Panel,
        'Vertical',
        { margin: 8 },
        // Branch label (True/False) above the node
        $(
          go.TextBlock,
          {
            font: 'bold 12px sans-serif',
            stroke: '#6b7280',
            alignment: go.Spot.Center,
            margin: new go.Margin(0, 0, 8, 0),
          },
          new go.Binding('text', 'branchLabel'),
          new go.Binding('visible', 'branchLabel', (label) => !!label)
        ),
        // Main content panel
        $(
          go.Panel,
          'Table',
          $(
            go.Panel,
            'Horizontal',
            { row: 0, column: 0, alignment: go.Spot.Left },
            // Icon based on category
            $(
              go.Picture,
              {
                margin: new go.Margin(0, 6, 0, 6),
                width: 16,
                height: 16,
                imageStretch: go.GraphObject.Uniform,
              },
              new go.Binding('source', 'icon')
            ),
            $(
              go.TextBlock,
              {
                font: 'bold 13px sans-serif',
                stroke: '#1f2937',
              },
              new go.Binding('text', 'name')
            )
          ),
          $(
            go.TextBlock,
            {
              font: '11px sans-serif',
              stroke: '#6b7280',
              row: 1,
              column: 0,
              margin: new go.Margin(2, 0, 0, 6),
              maxLines: 2,
              overflow: go.TextOverflow.Ellipsis,
            },
            new go.Binding('text', 'description')
          )
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
          font: 'bold 12px sans-serif',
          stroke: '#1f2937',
          background: 'rgba(255, 255, 255, 0.9)',
          segmentIndex: 0,
          segmentFraction: 0.2,
          segmentOffset: new go.Point(0, -12),
          margin: new go.Margin(3, 6, 3, 6),
        },
        new go.Binding('text', 'label').makeTwoWay()
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
        icon: createIconUrl('flash'),
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
        icon: createIconUrl('people'),
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
        icon: createIconUrl('help'),
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
          icon: createIconUrl('email'),
          branchLabel: 'False',
        });

        linkDataArray.push({
          from: conditionKey,
          to: channelKey,
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
            icon: createIconUrl('notifications'),
          },
          {
            key: emailKey,
            name: 'Email',
            description: 'Send via Sendgrid.',
            category: 'email',
            icon: createIconUrl('email'),
          },
          {
            key: whatsappKey,
            name: 'Whatsapp',
            description: 'Send via One Signal',
            category: 'whatsapp',
            icon: createIconUrl('whatsapp'),
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
          icon: createIconUrl('api'),
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
            icon: createIconUrl('settings'),
            branchLabel: 'True',
          },
          {
            key: inappKey,
            name: 'In app',
            description: 'Send via DOKAAI In app',
            category: 'inapp',
            icon: createIconUrl('phone'),
          },
          {
            key: delayKey,
            name: 'Delay',
            description: 'wait for 30 min',
            category: 'delay',
            icon: createIconUrl('schedule'),
          },
          {
            key: rewardsKey,
            name: 'Rewards node',
            description: '#733373737',
            category: 'rewards',
            icon: createIconUrl('gift'),
          }
        );

        // Links for True branch
        linkDataArray.push(
          {
            from: conditionKey,
            to: digestKey,
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
