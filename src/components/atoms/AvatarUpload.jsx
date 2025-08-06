import React, { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import Button from './Button';
import Icon from './Icon';
import Avatar from './Avatar';
import Text from './Text'; // Added missing import for Text

const AvatarUpload = ({ 
  currentAvatar,
  userName,
  onAvatarChange,
  size = 'xl',
  className 
}) => {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validação do arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione uma imagem válida (JPEG, PNG ou WebP)');
      return;
    }

    if (file.size > maxSize) {
      alert('A imagem deve ter menos de 5MB');
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) return;

    setIsUploading(true);
    
    try {
      // Simular upload - em produção, aqui você faria o upload real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria o upload real para um servidor
      // const uploadedUrl = await uploadToServer(preview);
      
      onAvatarChange(preview); // Por enquanto, usamos o preview como URL
      setPreview(null);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('flex flex-col items-center space-y-4', className)}>
      {/* Avatar Preview */}
      <div className="relative">
        <Avatar
          src={preview || currentAvatar}
          alt={userName}
          size={size}
          fallback={userName}
          className="ring-4 ring-primary/20"
        />
        
        {/* Botão de Upload */}
        <Button
          size="icon"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Icon name="camera" size={16} />
        </Button>
      </div>

      {/* Input de Arquivo (oculto) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Botões de Ação */}
      {preview && (
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={handleUpload}
            disabled={isUploading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isUploading ? (
              <>
                <Icon name="loader" size={16} className="mr-1 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Icon name="check" size={16} className="mr-1" />
                Salvar
              </>
            )}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isUploading}
          >
            <Icon name="x" size={16} className="mr-1" />
            Cancelar
          </Button>
        </div>
      )}

      {/* Dicas */}
      <div className="text-center">
        <Text variant="caption" className="text-muted-foreground">
          Clique na câmera para alterar a foto
        </Text>
        <Text variant="caption" className="text-muted-foreground block mt-1">
          JPG, PNG ou WebP até 5MB
        </Text>
      </div>
    </div>
  );
};

export default AvatarUpload; 