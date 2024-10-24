/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2 } from 'lucide-react';
import { files } from '@/lib/api';

export default function FileManager() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const { files: fileList } = await files.list();
      setUploadedFiles(fileList);
    } catch (err) {
      setError('Failed to load files');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      await files.upload(file);
      await loadFiles();
    } catch (err) {
      setError('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      await files.delete(filename);
      setUploadedFiles(prev => prev.filter(f => f !== filename));
    } catch (err) {
      setError('Failed to delete file');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".txt,.pdf,.md,.markdown"
            className="hidden"
            id="file-upload"
          />
          <Button
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={loading}
            className="w-full"
          >
            Upload Document
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {uploadedFiles.map((filename) => (
              <div
                key={filename}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="truncate">{filename}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(filename)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}