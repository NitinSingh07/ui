import {
  Select,
  MenuItem,
  ListSubheader,
  ListItemIcon,
  Avatar,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import React, { useMemo, useState } from 'react';

import { truncateName } from '@/cuteui/lib/truncate-name';
import theme from '@/theme';

import { CuteCheckbox } from '../checkbox';

const ChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type RawOption =
  | string
  | { value: string; label: string; avatarUrl?: string; icon?: React.ReactNode };

type Option = { value: string; label: string; avatarUrl?: string; icon?: React.ReactNode };
const toOption = (o: RawOption): Option => (typeof o === 'string' ? { value: o, label: o } : o);

/** ---------- helpers ---------- */
const toPx = (h?: number | string): number | undefined => {
  if (h == null) return;
  if (typeof h === 'number') return h;
  const m = /(-?\d+(\.\d+)?)/.exec(h.trim());
  return m ? parseFloat(m[1]) : undefined;
};

const sizeHeights: Record<'sm' | 'md' | 'lg', number> = {
  sm: 28,
  md: 40, // current default
  lg: 48,
};

/** ---------- Discriminated props (best practice) ---------- */
type BaseProps = {
  options: RawOption[];
  renderValue?: (selected: string | string[]) => React.ReactNode;
  sx?: object;
  disabled?: boolean;
  error?: boolean;
  variant?: 'default' | 'pill';
  showSearch?: boolean;
  showAvatar?: boolean;
  showIcon?: boolean;
  showCheckbox?: boolean;
  placeholder?: string;
  showPlaceholderInMenu?: boolean;
  placeholderColor?: string;
  iconColor?: string;

  /** NEW: sizing */
  height?: number | string; // overrides size if provided
  size?: 'sm' | 'md' | 'lg'; // default 'md'
};

type SingleProps = BaseProps & {
  multiple?: false;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
};

type MultiProps = BaseProps & {
  multiple: true;
  value: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
};

export type CustomSelectProps = SingleProps | MultiProps;

export const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const {
    options,
    renderValue,
    sx,
    disabled = false,
    error = false,
    variant = 'default',
    showSearch = false,
    showAvatar = false,
    showIcon = false,
    showCheckbox = false,
    placeholder = 'Select',
    showPlaceholderInMenu = false,
    placeholderColor = 'var(--text-primary)',
    iconColor,
    height = 52,
    size = 'md',
  } = props;

  const opts = useMemo(() => options.map(toOption), [options]);

  // Normalize internal value for rendering
  const normalizedValue: string | string[] = useMemo(() => {
    if (props.multiple) {
      const v = props.value;
      return Array.isArray(v) ? v : [];
    }
    const v = props.value as string | string[];
    return Array.isArray(v) ? (v[0] ?? '') : (v ?? '');
  }, [props.value, props.multiple]);

  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? opts.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
      : opts;
  }, [opts, query]);

  const isPill = variant === 'pill';
  const hasAny = Array.isArray(normalizedValue)
    ? normalizedValue.length > 0
    : normalizedValue !== '';

  /** ---------- Change shim: parents receive correct type ---------- */
  const handleChange = (e: SelectChangeEvent<string | string[]>) => {
    if (props.multiple) {
      const raw = e.target.value;
      const arr = Array.isArray(raw) ? raw : typeof raw === 'string' ? raw.split(',') : [];
      const synthetic = {
        ...e,
        target: { ...e.target, value: arr },
      } as unknown as SelectChangeEvent<string[]>;
      (props.onChange as (ev: SelectChangeEvent<string[]>) => void)(synthetic);
    } else {
      const raw = e.target.value;
      const str = Array.isArray(raw) ? (raw[0] ?? '') : (raw ?? '');
      const synthetic = {
        ...e,
        target: { ...e.target, value: str },
      } as unknown as SelectChangeEvent<string>;
      (props.onChange as (ev: SelectChangeEvent<string>) => void)(synthetic);
    }
  };

  // -------- Field styles (base) --------
  const getFieldStyles = () =>
    isPill
      ? {
          width: '100%',
          minWidth: 40,
          borderRadius: '9999px',
          bgcolor: hasAny ? '#2c2c2c' : 'transparent',
          color: hasAny ? 'white' : 'inherit',
          '& .MuiSelect-select': {
            paddingRight: '32px !important',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: hasAny ? '#2c2c2c' : 'var(--action-active)',
            borderWidth: '1px !important',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: hasAny ? '#2c2c2c' : 'var(--action-active)',
            borderWidth: '1px !important',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: hasAny ? '#2c2c2c' : 'var(--action-active)',
            borderWidth: '1px !important',
          },
          '& .MuiSelect-icon': { color: hasAny ? 'white' : 'inherit' },
        }
      : {
          width: '100%',
          minHeight: 40, // overridden by custom size below if provided
          borderRadius: '6px',
          bgcolor: 'var(--text-hint)',
          color: 'var(--text-primary)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--text-secondary)',
            borderWidth: '1px !important',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--text-secondary)',
            borderWidth: '1px !important',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--primary-main)',
            borderWidth: '1px !important',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
            bgcolor: 'var(--background-disabled)',
          },
          '& .MuiSelect-select': {
            padding: '8px 12px',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: 'var(--text-primary)',
          },
        };

  // -------- Menu item styles --------
  const itemStyles = {
    height: 52,
    px: 2,
    borderBottom: `1px solid ${theme.palette.action.disabled}`,
    '&:last-child': { borderBottom: 'none' },
    '&:hover': { bgcolor: 'var(--background-offset-weak)' },
    '&.Mui-selected': {
      color: 'var(--text-primary)',
      bgcolor: 'var(--background-offset-weak)',
      '&:hover': { bgcolor: 'var(--background-offset-weak)' },
    },
    '&.Mui-focusVisible': { bgcolor: 'var(--background-offset-weak)' },
    '&.Mui-selected.Mui-focusVisible': { bgcolor: 'var(--background-offset-weak)' },
  } as const;

  const isEmpty = (sel: string | string[] | null | undefined): boolean =>
    Array.isArray(sel) ? sel.length === 0 : !sel;

  // -------- Renderers --------
  const pillRenderValue = (selected: string | string[]) => {
    if (!props.multiple) {
      const v = Array.isArray(selected) ? (selected[0] ?? '') : selected;
      if (!v) {
        return (
          <div className="flex items-center gap-2 w-full">
            <span className="truncate bodyRegular" style={{ color: placeholderColor }}>
              {placeholder}
            </span>
          </div>
        );
      }
      const lbl = opts.find((o) => o.value === v)?.label ?? v;
      return (
        <div className="flex items-center gap-2 w-full">
          <span className="truncate">{truncateName(lbl, 28)}</span>
        </div>
      );
    }

    const arr: string[] = Array.isArray(selected) ? selected : [];
    if (!arr.length) {
      return (
        <span className="truncate bodyRegular" style={{ color: placeholderColor }}>
          {placeholder}
        </span>
      );
    }

    const labels = arr.map((v) => opts.find((o) => o.value === v)?.label ?? v);
    const summary = labels.length > 1 ? `${labels[0]} + ${labels.length - 1} more` : labels[0];

    const clear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleChange({ target: { value: [] } } as unknown as SelectChangeEvent<string | string[]>);
    };

    return (
      <div className="flex items-center gap-2 w-full text-white">
        <span className="truncate">{truncateName(summary, 30)}</span>
        <button
          type="button"
          onClick={clear}
          className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-gray-800 text-xs font-bold"
          aria-label="Clear"
        >
          ×
        </button>
      </div>
    );
  };

  const defaultRender: (selected: string | string[]) => React.ReactNode =
    renderValue ||
    ((selected: string | string[]) => {
      if (isEmpty(selected)) {
        return (
          <span className="truncate bodyRegular" style={{ color: placeholderColor }}>
            {placeholder}
          </span>
        );
      }

      if (!props.multiple) {
        const v = Array.isArray(selected) ? (selected[0] ?? '') : selected;
        const lbl = opts.find((o) => o.value === v)?.label ?? v;
        return lbl;
      }

      const arr: string[] = Array.isArray(selected) ? selected : [];
      const labels = arr.map((v) => opts.find((o) => o.value === v)?.label ?? v).join(', ');
      return truncateName(labels, 28);
    });

  const stopKey = (e: React.KeyboardEvent | React.MouseEvent) => e.stopPropagation();

  // ---- effective height (explicit height wins over size) ----
  const hPx = toPx(height) ?? sizeHeights[size];
  const contentH = Math.max(16, hPx - 10); // inner text line height
  const iconDims =
    hPx <= 30
      ? { w: 14, h: 14, right: 6 }
      : hPx >= 46
        ? { w: 18, h: 18, right: 8 }
        : { w: 16, h: 16, right: 8 };

  return (
    <Select
      multiple={props.multiple}
      value={props.multiple ? (normalizedValue as string[]) : (normalizedValue as string)}
      onChange={handleChange}
      renderValue={isPill ? pillRenderValue : defaultRender}
      displayEmpty
      disabled={disabled}
      error={error}
      inputProps={{ 'aria-label': 'Custom select' }}
      IconComponent={ChevronDown}
      sx={{
        ...theme.typography.bodyRegular,
        ...getFieldStyles(),

        // ► apply compact sizing consistently (root + inner)
        '&&': {
          height: `${hPx}px`,
          minHeight: `${hPx}px`,
        },
        '&& .MuiInputBase-root, && .MuiOutlinedInput-root': {
          height: `${hPx}px !important`,
          minHeight: `${hPx}px !important`,
          boxSizing: 'border-box',
          borderRadius: '6px',
        },
        '&& .MuiInputBase-input, && .MuiOutlinedInput-input, && .MuiSelect-select': {
          minHeight: '0 !important',
          height: `${contentH}px !important`,
          lineHeight: `${contentH}px !important`,
          paddingTop: '0 !important',
          paddingBottom: '0 !important',
          paddingLeft: '12px !important',
          paddingRight: '28px !important',
          display: 'flex',
          alignItems: 'center',
        },

        // chevron
        '& .MuiSelect-icon': {
          right: iconDims.right,
          width: iconDims.w,
          height: iconDims.h,
          color: iconColor ?? (isPill ? (hasAny ? 'white' : 'inherit') : 'var(--text-primary)'),
        },
        '&.Mui-focused .MuiSelect-icon': {
          color: iconColor ?? (isPill && hasAny ? 'white' : 'var(--text-primary)'),
        },

        // user overrides last
        ...sx,
      }}
      MenuProps={{
        disableAutoFocusItem: true,
        PaperProps: {
          elevation: 0,
          className: 'rounded-lg bg-background-paper',
          sx: {
            mt: 1,
            overflow: 'hidden',
            maxHeight: '22rem',
            minHeight: '4rem',
            overflowY: 'auto',
            scrollbarGutter: 'stable both-edges',
            borderRadius: '6px',
            bgcolor: 'var(--Surface-Level-1, #FFF)',
            boxShadow: '0 4px 64px 0 rgba(111, 125, 154, 0.11)',
          },
        },
        MenuListProps: { disablePadding: true, autoFocusItem: false, className: 'p-0' },
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      }}
    >
      {showPlaceholderInMenu && (
        <MenuItem value="" disabled sx={{ height: 44 }}>
          <span style={{ color: placeholderColor }}>{placeholder}</span>
        </MenuItem>
      )}

      {showSearch && (
        <ListSubheader
          onKeyDown={stopKey}
          onMouseDown={stopKey}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            px: 2,
            py: 1,
            m: 0,
            bgcolor: 'var(--Surface-Level-1, #FFF) !important',
            borderBottom: '1px solid var(--background-offset-weak)',
          }}
        >
          {/* your search box stays the same */}
          <Box
            onKeyDown={stopKey}
            onMouseDown={stopKey}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 40,
              my: 0.5,
              px: 1,
              borderRadius: '9999px',
              bgcolor: 'var(--background-offset-weak)',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
              '&:focus-within': { border: '1px solid #389F7F' },
            }}
            role="search"
            aria-label="Filter options"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ flex: '0 0 auto' }}
            >
              <path
                d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent outline-none border-0 ring-0 focus:outline-none focus:ring-0 appearance-none placeholder:text-text-secondary text-text-primary text-sm"
              style={{ lineHeight: '1', height: '100%' }}
            />
          </Box>
        </ListSubheader>
      )}

      {filtered.length === 0 ? (
        <MenuItem disabled sx={{ height: 44 }}>
          <span className="text-text-secondary">No results</span>
        </MenuItem>
      ) : (
        filtered.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={itemStyles}>
            <div className="flex items-center gap-3 w-full">
              {showCheckbox && (
                <CuteCheckbox
                  checked={
                    Array.isArray(normalizedValue)
                      ? normalizedValue.includes(opt.value)
                      : normalizedValue === opt.value
                  }
                  className="!p-0"
                />
              )}
              {showAvatar && opt.avatarUrl && (
                <Avatar src={opt.avatarUrl} sx={{ width: 26, height: 26 }} />
              )}
              {showIcon && opt.icon && (
                <ListItemIcon className="min-w-0 mr-0">{opt.icon}</ListItemIcon>
              )}
              <span className="text-text-primary bodyRegular">{truncateName(opt.label, 28)}</span>
            </div>
          </MenuItem>
        ))
      )}
    </Select>
  );
};

export default CustomSelect;
