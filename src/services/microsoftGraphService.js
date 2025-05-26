import axios from 'axios';

const BASE_URL = 'https://graph.microsoft.com/v1.0';

// Add your Microsoft Graph token here
const ACCESS_TOKEN = '';

class MicrosoftGraphService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Get emails from inbox
  async getEmails(top = 50, skip = 0) {
    try {
      const response = await this.axiosInstance.get(`/me/messages`, {
        params: {
          $top: top,
          $skip: skip,
          $select: 'id,subject,from,receivedDateTime,bodyPreview,importance,hasAttachments,isRead,flag',
          $orderby: 'receivedDateTime desc'
        }
      });
      return response.data.value;
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw error;
    }
  }

  // Send email with attachments
  async sendEmail(emailData) {
    try {
      // First, create a draft message
      const draftMessage = {
        subject: emailData.subject,
        body: {
          contentType: "HTML",
          content: emailData.content
        },
        toRecipients: emailData.to.map(recipient => ({
          emailAddress: {
            address: recipient
          }
        })),
        ccRecipients: emailData.cc?.map(recipient => ({
          emailAddress: {
            address: recipient
          }
        })) || [],
        bccRecipients: emailData.bcc?.map(recipient => ({
          emailAddress: {
            address: recipient
          }
        })) || []
      };

      // Create the draft message
      const draftResponse = await this.axiosInstance.post('/me/messages', draftMessage);
      const messageId = draftResponse.data.id;

      // Handle attachments if any
      if (emailData.attachments && emailData.attachments.length > 0) {
        for (const file of emailData.attachments) {
          // Convert file to base64
          const base64Content = await this.fileToBase64(file);
          
          // Upload attachment
          await this.axiosInstance.post(`/me/messages/${messageId}/attachments`, {
            "@odata.type": "#microsoft.graph.fileAttachment",
            "name": file.name,
            "contentType": file.type,
            "contentBytes": base64Content.split(',')[1] // Remove the data URL prefix
          });
        }
      }

      // Send the message
      await this.axiosInstance.post(`/me/messages/${messageId}/send`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  // Helper method to convert File to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // Get email details with attachments
  async getEmailDetails(emailId) {
    try {
      // Get email details
      const response = await this.axiosInstance.get(`/me/messages/${emailId}`, {
        params: {
          $select: 'id,subject,from,receivedDateTime,body,importance,hasAttachments,isRead,flag,toRecipients,ccRecipients,bccRecipients,attachments'
        }
      });

      const email = response.data;

      // If email has attachments, get their details
      if (email.hasAttachments) {
        const attachmentsResponse = await this.axiosInstance.get(`/me/messages/${emailId}/attachments`);
        email.attachments = attachmentsResponse.data.value;
      }

      return email;
    } catch (error) {
      console.error('Error fetching email details:', error);
      throw error;
    }
  }

  // Update email (mark as read/unread, flag, etc.)
  async updateEmail(emailId, updates) {
    try {
      const response = await this.axiosInstance.patch(`/me/messages/${emailId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  }

  // Delete email
  async deleteEmail(emailId) {
    try {
      await this.axiosInstance.delete(`/me/messages/${emailId}`);
      return true;
    } catch (error) {
      console.error('Error deleting email:', error);
      throw error;
    }
  }

  // Download attachment
  async downloadAttachment(messageId, attachmentId) {
    try {
      // First get the attachment metadata to get the content type and name
      const metadataResponse = await this.axiosInstance.get(`/me/messages/${messageId}/attachments/${attachmentId}`);
      const attachment = metadataResponse.data;
      
      // Then get the actual file content
      const response = await this.axiosInstance.get(`/me/messages/${messageId}/attachments/${attachmentId}/$value`, {
        responseType: 'arraybuffer'
      });

      // Create blob with the correct content type
      const blob = new Blob([response.data], { type: attachment.contentType });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', attachment.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading attachment:', error);
      throw error;
    }
  }

  // Helper method to get file extension from content type
  getFileExtensionFromContentType(contentType) {
    const contentTypeMap = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/gif': 'gif',
      'image/bmp': 'bmp',
      'image/webp': 'webp',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
      'text/plain': 'txt',
      'text/csv': 'csv',
      'application/zip': 'zip',
      'application/x-rar-compressed': 'rar',
      'application/x-7z-compressed': '7z'
    };
    
    return contentTypeMap[contentType] || null;
  }
}

export default MicrosoftGraphService; 